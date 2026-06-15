import config from '@payload-config';
import { getPayload } from 'payload';
import { shouldFetchBlogFromCms } from '@/lib/cms-runtime';
import { skipPayloadFetchAtBuild } from '@/lib/skip-payload-fetch-at-build';

export type CommentStatus = 'approved' | 'pending' | 'spam' | 'unapproved';

export type BlogComment = {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
  isEditorialReply: boolean;
  replies: BlogComment[];
};

type CommentRecord = {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
  isEditorialReply?: boolean | null;
  parent?: null | number | { id: number };
};

type PayloadWithComments = {
  find: (args: {
    collection: 'comments';
    where?: unknown;
    sort?: string;
    limit?: number;
    depth?: number;
  }) => Promise<{ docs: CommentRecord[] }>;
  create: (args: {
    collection: 'comments';
    data: {
      post: number;
      authorName: string;
      authorEmail?: string;
      content: string;
      status?: CommentStatus;
      parent?: number;
      isEditorialReply?: boolean;
    };
  }) => Promise<unknown>;
  update: (args: {
    collection: 'comments';
    id: number;
    data: {
      status?: CommentStatus;
    };
  }) => Promise<unknown>;
  delete: (args: { collection: 'comments'; id: number }) => Promise<unknown>;
};

function parentId(parent: CommentRecord['parent']): number | null {
  if (typeof parent === 'number') return parent;
  if (parent && typeof parent === 'object' && 'id' in parent) return parent.id;
  return null;
}

function formatCommentDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString().slice(0, 10);
}

function toBlogComment(doc: CommentRecord): BlogComment {
  return {
    id: doc.id,
    authorName: doc.authorName,
    content: doc.content,
    createdAt: formatCommentDate(doc.createdAt),
    isEditorialReply: Boolean(doc.isEditorialReply),
    replies: [],
  };
}

function buildCommentTree(docs: CommentRecord[]): BlogComment[] {
  const byId = new Map<number, BlogComment>();
  const roots: BlogComment[] = [];

  for (const doc of docs) {
    byId.set(doc.id, toBlogComment(doc));
  }

  for (const doc of docs) {
    const comment = byId.get(doc.id);
    if (!comment) continue;

    const parent = parentId(doc.parent);
    if (parent && byId.has(parent)) {
      byId.get(parent)?.replies.push(comment);
      continue;
    }

    roots.push(comment);
  }

  return roots;
}

async function getPayloadWithComments(): Promise<PayloadWithComments> {
  return (await getPayload({ config })) as unknown as PayloadWithComments;
}

export async function fetchApprovedCommentsForPost(
  postId: number
): Promise<BlogComment[]> {
  if (!shouldFetchBlogFromCms()) return [];
  if (skipPayloadFetchAtBuild()) return [];

  try {
    const payload = await getPayloadWithComments();
    const { docs } = await payload.find({
      collection: 'comments',
      where: {
        and: [{ post: { equals: postId } }, { status: { equals: 'approved' } }],
      },
      sort: 'createdAt',
      limit: 200,
      depth: 0,
    });

    return buildCommentTree(docs);
  } catch {
    return [];
  }
}

export type AdminComment = {
  id: number;
  authorName: string;
  content: string;
  status: CommentStatus;
  createdAt: string;
  postId: number;
  postTitle: string;
  postSlug: string;
  parentId: number | null;
  isEditorialReply: boolean;
};

export type AdminCommentNode = AdminComment & {
  replies: AdminCommentNode[];
};

export type EditorReplyProfile = {
  name: string;
  title: string;
  avatar: string;
};

type AdminCommentRecord = CommentRecord & {
  status: CommentStatus;
  post: number | { id: number; title?: string; slug?: string };
};

function mapAdminComment(doc: AdminCommentRecord): AdminComment {
  const post =
    typeof doc.post === 'object' && doc.post
      ? doc.post
      : { id: Number(doc.post), title: 'Post', slug: '' };

  return {
    id: doc.id,
    authorName: doc.authorName,
    content: doc.content,
    status: doc.status,
    createdAt: formatCommentDate(doc.createdAt),
    postId: post.id,
    postTitle: String(post.title ?? 'Post'),
    postSlug: String(post.slug ?? ''),
    parentId: parentId(doc.parent),
    isEditorialReply: Boolean(doc.isEditorialReply),
  };
}

async function fetchAllAdminCommentRecords(): Promise<AdminCommentRecord[]> {
  if (!shouldFetchBlogFromCms()) return [];
  if (skipPayloadFetchAtBuild()) return [];

  try {
    const payload = await getPayloadWithComments();
    const { docs } = await payload.find({
      collection: 'comments',
      sort: '-createdAt',
      limit: 200,
      depth: 1,
    });

    return docs as AdminCommentRecord[];
  } catch {
    return [];
  }
}

export async function fetchAllCommentsForAdmin(): Promise<AdminComment[]> {
  const docs = await fetchAllAdminCommentRecords();
  return docs.map(mapAdminComment);
}

function nodeMatchesFilter(
  node: AdminCommentNode,
  filter: CommentStatus | 'all'
): boolean {
  if (filter === 'all') return true;
  if (node.status === filter) return true;
  return node.replies.some((reply) => nodeMatchesFilter(reply, filter));
}

export function buildAdminCommentTree(
  comments: AdminComment[],
  filter: CommentStatus | 'all' = 'all'
): AdminCommentNode[] {
  const byId = new Map<number, AdminCommentNode>();

  for (const comment of comments) {
    byId.set(comment.id, { ...comment, replies: [] });
  }

  const roots: AdminCommentNode[] = [];

  for (const comment of comments) {
    const node = byId.get(comment.id);
    if (!node) continue;

    const parent = comment.parentId;
    if (parent && byId.has(parent)) {
      byId.get(parent)?.replies.push(node);
      continue;
    }

    roots.push(node);
  }

  const sortNodes = (nodes: AdminCommentNode[]) => {
    nodes.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    for (const node of nodes) {
      sortNodes(node.replies);
    }
  };

  sortNodes(roots);

  return roots.filter((node) => nodeMatchesFilter(node, filter));
}

export async function createBlogComment(input: {
  postId: number;
  authorName: string;
  authorEmail?: string;
  content: string;
}): Promise<void> {
  const payload = await getPayloadWithComments();

  await payload.create({
    collection: 'comments',
    data: {
      post: input.postId,
      authorName: input.authorName,
      authorEmail: input.authorEmail,
      content: input.content,
      status: 'pending',
    },
  });
}

export async function createEditorialReply(input: {
  postId: number;
  parentId: number;
  content: string;
  authorName: string;
  postTitle?: string;
  postSlug?: string;
}): Promise<AdminComment> {
  const payload = await getPayloadWithComments();

  const created = (await payload.create({
    collection: 'comments',
    data: {
      post: input.postId,
      authorName: input.authorName,
      content: input.content,
      status: 'approved',
      parent: input.parentId,
      isEditorialReply: true,
    },
  })) as AdminCommentRecord;

  return mapAdminComment({
    ...created,
    status: 'approved',
    isEditorialReply: true,
    post: {
      id: input.postId,
      title: input.postTitle ?? 'Post',
      slug: input.postSlug ?? '',
    },
  });
}

export async function updateCommentStatus(
  commentId: number,
  status: CommentStatus
): Promise<void> {
  const payload = await getPayloadWithComments();

  await payload.update({
    collection: 'comments',
    id: commentId,
    data: { status },
  });
}

export async function deleteComment(commentId: number): Promise<void> {
  const payload = await getPayloadWithComments();

  await payload.delete({
    collection: 'comments',
    id: commentId,
  });
}
