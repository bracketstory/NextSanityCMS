"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCube, FaBuilding, FaCogs, FaUsers } from 'react-icons/fa';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-gray-100" id="navbar">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white">
            <FaCube size={18} fill="currentColor" />
          </div>
          <span>SampleVC</span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href={isHome ? "#companies" : "/#companies"} className="hover:text-brand-500 transition-colors flex items-center gap-1.5"><FaBuilding /> Companies</a>
          <a href={isHome ? "#how-it-works" : "/#how-it-works"} className="hover:text-brand-500 transition-colors flex items-center gap-1.5"><FaCogs /> How it Works</a>
          <a href={isHome ? "#team" : "/#team"} className="hover:text-brand-500 transition-colors flex items-center gap-1.5"><FaUsers /> Team</a>
        </div>
        <Link href="/apply" className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5">
          Apply Now
        </Link>
      </div>
    </nav>
  );
}
