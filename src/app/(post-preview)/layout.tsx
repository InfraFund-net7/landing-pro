import Footer from '@/component/footer';
import Header from '@/component/header';
import '@/app/globals.css';

export default function PostPreviewSiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="website-root">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
