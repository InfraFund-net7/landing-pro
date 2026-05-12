import HomePageClient from '@/component/home-page-client';
import { fetchHomePageContent } from '@/lib/cms-homepage';

export default async function Home() {
  const content = await fetchHomePageContent();
  return <HomePageClient content={content} />;
}
