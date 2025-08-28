"use client"
import { usePathname } from 'next/navigation';
import Navbar from '@/components/landing/Navbar';

const ConditionalNavbar = () => {
  const pathname = usePathname();

  // Hide navbar on dashboard pages
  const showNavbar = !pathname.startsWith('/dashboard');

  if (!showNavbar) {
    return null;
  }

  return <Navbar />;
};

export default ConditionalNavbar;
