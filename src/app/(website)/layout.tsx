import Footer from '@/component/footer';
import PathnameWrapper from './PathnameWrapper';
import Script from 'next/script';

export default function WebsiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="website-root">
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      <PathnameWrapper>{children}</PathnameWrapper>
      <Footer />
    </div>
  );
}
