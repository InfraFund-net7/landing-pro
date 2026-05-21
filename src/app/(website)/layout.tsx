import Footer from '@/component/footer';
import PathnameWrapper from './PathnameWrapper';
import Script from 'next/script';
import '../globals.css';

/** CMS pages read Neon at request time; avoids 60s SSG timeouts during Vercel build. */
export const dynamic = 'force-dynamic';

export default function WebsiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="website-root">
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="afterInteractive"
          />
          <PathnameWrapper>{children}</PathnameWrapper>
          <Footer />
        </div>
      </body>
    </html>
  );
}
