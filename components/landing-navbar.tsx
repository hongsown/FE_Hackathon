'use client';

import { cn } from '@/lib/utils';
import { useAuth } from '@clerk/nextjs';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { ModeToggle } from './modetoggle';

const font = Montserrat({
  weight: '600',
  subsets: ['latin'],
});
const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav className='p-4 bg-white dark:bg-[#111827] flex items-center justify-between shadow-lg fixed z-50 top-0 left-0 w-full'>
      <Link href='/' className='flex items-center'>
        <div className='relative h-8 w-8 mr-4'>
          <Image fill src='/logo.png' alt='image' />
        </div>
        <h1
          className={cn('text-2xl font-bold dark:text-white', font.className)}
        >
          LogiRecy
        </h1>
      </Link>
      <div className='flex gap-4'>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button variant='outline' className='rounded-full'>
            Get Started
          </Button>
        </Link>
        <div className='relative'>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
