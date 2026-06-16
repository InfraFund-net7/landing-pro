import '@/app/globals.css';

export default function PostPreviewSiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#06080d] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
