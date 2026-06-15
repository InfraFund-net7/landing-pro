export type CommentStatus = 'approved' | 'pending' | 'spam' | 'unapproved';

export type BlogComment = {
  id: number;
  authorName: string;
  authorTitle?: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  isEditorialReply: boolean;
  isTeamMember: boolean;
  replies: BlogComment[];
};

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
