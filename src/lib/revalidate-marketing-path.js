/** Revalidate a marketing route after CMS changes (Next.js runtime only). */
export async function revalidateMarketingPath(path) {
  try {
    const { revalidatePath } = await import('next/cache');
    revalidatePath(path, 'page');
    revalidatePath(path, 'layout');
  } catch {
    // Payload config is also loaded outside Next (e.g. import map generation).
  }
}
