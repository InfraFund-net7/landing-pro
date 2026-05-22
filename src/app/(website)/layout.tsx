import Footer from '@/component/footer';
import PathnameWrapper from './PathnameWrapper';
import Script from 'next/script';
import '../globals.css';

/** Cached marketing pages; CMS only when CMS_REPLACE_* / CMS_FETCH_* env flags are set. */
export const revalidate = 60;

export default function WebsiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();

  return (
    <html lang="en">
      <body className="antialiased">
        <div className="website-root">
          {recaptchaSiteKey ? (
            <Script
              src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
              strategy="afterInteractive"
            />
          ) : null}
          <PathnameWrapper>{children}</PathnameWrapper>
          <Footer />
        </div>
      </body>
    </html>
  );
}
