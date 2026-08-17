'use client';
import { X, Menu } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import InfraFund from '@/../public/svg/infrafund.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import DashLoginButton from './DashLoginButton';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (isMenuOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        pointerEvents: 'auto',
      });
      gsap.to(sidebarRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        pointerEvents: 'none',
      });
      gsap.to(sidebarRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  }, [isMenuOpen, mounted]);

  const Navigation = [
    { name: 'Projects', route: '/project' },
    { name: 'Investors', route: '/Investors' },
    { name: 'Builders', route: '/builders' },
    { name: 'Learn', route: '/blog' },
    { name: 'About Us', route: '/about-us' },
  ];

  return (
    <>
      <header
        className={`w-full h-fit px-[90px] flex flex-col text-sm font-medium
        transition-all duration-500 ease-in-out max-md:px-6
        ${scrolled ? 'backdrop-blur-md bg-black/40 shadow-md' : 'bg-transparent'}
        fixed top-0 left-0 z-[950]`}
      >
        <div className="w-full h-fit grid grid-cols-[1fr_auto_1fr] items-center py-2 transition-all duration-500 relative z-[960]">
          <div className="w-fit h-fit flex justify-self-start justify-center items-center">
            <Image
              src={InfraFund || '/placeholder.svg'}
              alt="InfraFund"
              className="cursor-pointer w-auto h-auto"
              onClick={() => router.push('/')}
            />
          </div>

          <div className="hidden lg:flex justify-self-center justify-center items-center gap-4">
            {Navigation.map((item, index) => (
              <Link
                href={item.route}
                className="text-white font-bold hover:transition-colors hover:text-[#24FF8E]"
                key={index}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex justify-self-end items-center gap-4">
            <div className="hidden lg:flex justify-center items-center h-12">
              <DashLoginButton className="px-6 h-full cursor-pointer bg-white flex justify-center items-center text-black rounded-[13px] font-bold">
                Connect Wallet
              </DashLoginButton>
            </div>

            <button
              className="lg:hidden flex justify-center items-center text-white relative z-[970]"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={overlayRef}
        onClick={() => setIsMenuOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm opacity-0 pointer-events-none z-[998]"
      />
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] 
        bg-black/95 backdrop-blur-xl text-white z-[999]
        flex flex-col p-6 translate-x-full"
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 text-white hover:text-[#24FF8E]"
        >
          <X size={24} />
        </button>

        <div className="mt-10 mb-6">
          <Image
            src={InfraFund || '/placeholder.svg'}
            alt="InfraFund"
            className="cursor-pointer"
            onClick={() => {
              router.push('/');
              setIsMenuOpen(false);
            }}
          />
        </div>

        <nav className="flex flex-col gap-6 mt-6">
          {Navigation.map((item, index) => (
            <Link
              href={item.route}
              key={index}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg hover:text-[#24FF8E] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 pt-10">
          <DashLoginButton
            className="w-full h-10 flex justify-center items-center bg-white text-black rounded-[13px] font-bold"
            onClose={() => setIsMenuOpen(false)}
          >
            Connect Wallet
          </DashLoginButton>
        </div>
      </div>
    </>
  );
}
