'use client';
import { ChevronRight, X, Menu } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import InfraFund from '@/../public/svg/infrafund.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { CustomButton } from './ui/custom-button';
import { Modal } from './ui/modal';
import infrafund from "@/../public/svg/infrafund.svg"
import { waitlistdata } from '@/data/waitlist';
import greentik from "@/../public/svg/green-tik.svg"
import { FormInput } from './ui/form-input';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    { name: 'For Investors', route: '/Investors' },
    { name: 'For Builders', route: '/builders' },
    { name: 'Learn', route: '/blog' },
    { name: 'About Us', route: '/about-us' },
  ];

  return (
    <>
      <header
        className={`w-full h-fit px-[90px] flex flex-col gap-4 text-sm font-medium 
        transition-all duration-500 ease-in-out max-md:px-6
        ${scrolled ? 'backdrop-blur-md bg-black/40 shadow-md' : 'bg-transparent'}
        fixed top-0 left-0 z-[950]`}
      >
        {showBanner && (
          <div className="relative w-full h-11 bg-[#00000080] rounded-b-lg text-white flex justify-center items-center gap-1 sm:gap-1.5 text-[8px] sm:text-sm">
            InfraFund&apos;s INF token is launching soon. Join the
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-[#24FF8E] underline ml-1"
            >
              Waitlist{""} {""}{""}!
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#24FF8E]"
            >
              <X className="w-3 h-3 sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        )}

        <div className="w-full h-fit flex justify-between items-center py-2 transition-all duration-500 relative z-[960]">
          <div className="gap-8 w-fit h-fit flex justify-center items-center">
            <Image
              src={InfraFund || '/placeholder.svg'}
              alt="InfraFund"
              className="cursor-pointer w-auto h-auto"
              onClick={() => router.push('/')}
            />

            <div className="hidden lg:flex justify-center items-center gap-4">
              {Navigation.map((item, index) => (
                <Link
                  href={item.route}
                  className="text-white hover:transition-colors hover:text-[#24FF8E]"
                  key={index}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center gap-6 h-12">
            <button className="w-[110px] h-full bg-white flex justify-center items-center text-black rounded-[4px] border border-white font-bold">
              Login
            </button>
            <CustomButton
              variant="filled"
              className="w-[184px] h-full text-sm flex justify-center items-center font-bold"
            >
              Create Account
            </CustomButton>
          </div>

          <button
            className="lg:hidden flex justify-center items-center text-white relative z-[970]"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
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
          <button className="w-full h-10 bg-white text-black rounded-md font-medium">
            Login
          </button>
          <button className="w-full h-10 bg-[#24FF8E] text-black rounded-md font-medium">
            Create Account
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        showCloseButton={false}
      >
        <div className='gap-6 text-center flex flex-col justify-center items-center w-full h-fit px-2'>
          <div className='flex flex-col justify-center items-center w-full gap-2'>
            <Image
              src={infrafund}
              width={199}
              height={48}
              alt='infrafund'
              className='w-full max-w-[199px] h-auto'
            />
            <span className='text-xs sm:text-sm '
              style={{
                color: '#f5f6f8',
                WebkitTextFillColor: '#f5f6f8',
              }}
            >
              The OS for Green Infrastructure Tokenization
            </span>
          </div>

          <div className='flex justify-center items-center w-full gap-2'>
            <span className='text-xl sm:text-3xl  font-bold text-center leading-tight'
              style={{
                color: '#ffffff',
                WebkitTextFillColor: '#ffffff',
              }}
            >
              Finance the NetZero<br />Transition
            </span>
          </div>

          <div className='flex justify-center text-white items-center w-full gap-2 '>
            <span className='text-sm sm:text-base  text-center leading-relaxed'>
              Join the waiting list for the InfraFund Token launch.<br />
              Be the first to invest in a tokenized, sustainable future.
            </span>
          </div>

          <div className='flex flex-col justify-center items-center w-full gap-6'>
            <FormInput placeholder='Enter Your Email' />
            <CustomButton
              className='w-full h-[52px] text-black text-sm sm:text-base'
              variant='filled'
              type='button'
            >
              Get Early Access
            </CustomButton>
          </div>

          <div className='flex flex-col justify-center items-center gap-3 h-fit sm:h-[233px]  w-full border-t border-[#37415180] '>
            <span className='text-base font-bold'
              style={{
                color: '#ffffff',
                WebkitTextFillColor: '#ffffff',
              }}
            >By joining, you&apos;ll get:</span>
            {waitlistdata.map((item, index) => (
              <div className='w-full flex justify-start items-center text-white gap-2 text-base text-left' key={index}>
                <Image src={greentik} width={16} height={16} alt='green-tik' />
                <p>
                  <span className='font-bold'>{item.title}</span>:<span className='font-normal'>{item.description}</span>
                </p>
              </div>
            ))}
          </div>
          <div className='w-full h-1 flex justify-center items-center'>
            <span className=' text-[#6B7280] font-normal'>© 2025 InfraFund. All rights reserved.</span>
          </div>
        </div>
      </Modal>
    </>
  );
}
