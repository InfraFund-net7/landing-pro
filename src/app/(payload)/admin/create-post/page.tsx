import { requireContentManager } from '@/access/get-admin-user';
import { isMasterAdmin } from '@/access/roles.js';
import AiCompositionDashboard from '@/app/(payload)/admin/components/ai-composition-dashboard';
import { fetchUserProfileForEdit } from '@/lib/admin-update-profile.js';
import { isContentAgentEnabled } from '@/lib/content-agent-client';
import { getUserDisplayName } from '@/lib/user-profile.js';

export default async function CreatePostPage() {
  const user = await requireContentManager('/admin/create-post');
  const profile = await fetchUserProfileForEdit(user);
  const displayName = getUserDisplayName({ ...user, ...profile });
  const userInitial = displayName.charAt(0).toUpperCase();
  const usesLangGraphAgent = isContentAgentEnabled();
  const modelLabel = usesLangGraphAgent
    ? 'LangGraph + Tavily SEO'
    : process.env.COMPOSE_MODEL?.trim().replace(/^openai\//, '') ||
      'gpt-4.1-mini';

  return (
    <AiCompositionDashboard
      userName={displayName}
      userInitial={userInitial}
      isMasterAdmin={isMasterAdmin(user)}
      modelLabel={modelLabel}
      usesLangGraphAgent={usesLangGraphAgent}
    />
  );
}
