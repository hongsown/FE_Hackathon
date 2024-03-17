'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Sidebar from './sidebar';
import { useEffect, useState } from 'react';
interface SidebarMobileProps {
  apiLimitCount: number;
  isPro: boolean;
}
const SidebarMobile = ({
  apiLimitCount = 0,
  isPro = false,
}: SidebarMobileProps) => {
  const [isMounted, setIsMounted] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='p-0'>
        <Sidebar
          limitCount={apiLimitCount}
          isPro={isPro}
          setOpen={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
