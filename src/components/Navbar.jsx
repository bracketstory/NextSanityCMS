"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LuBuilding2, LuClipboardList, LuMenu, LuUsers, LuWorkflow, LuX } from 'react-icons/lu';

const sectionLinks = [
  { id: 'companies', label: 'Companies', icon: LuBuilding2 },
  { id: 'how-it-works', label: 'Program', icon: LuWorkflow },
  { id: 'team', label: 'Team', icon: LuUsers },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function updateScrollState() {
      setIsScrolled(window.scrollY > 24);
    }

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const sections = sectionLinks
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio);

      if (visibleSections[0]) setActiveSection(visibleSections[0].target.id);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  function getSectionLinkClass(id) {
    const isActive = isHome && activeSection === id;
    return `flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${isActive ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`;
  }

  return (
    <nav className={`sticky z-50 mx-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isScrolled ? 'top-3 w-[calc(100%-1.5rem)] max-w-6xl rounded-3xl border border-white/60 bg-white/75 shadow-lg shadow-gray-900/10 backdrop-blur-xl md:rounded-full' : 'top-0 w-full border-b border-gray-200 bg-white/95'}`} id="navbar" aria-label="Main navigation">
      <div className={`max-w-7xl mx-auto flex justify-between items-center gap-3 sm:gap-5 transition-[min-height,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isScrolled ? 'min-h-16 px-3 sm:px-6' : 'min-h-20 px-6'}`}>
        <Link href="/" className={`font-bold tracking-tighter flex items-center gap-2 transition-[font-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isScrolled ? 'text-xl' : 'text-2xl'}`}>
          <div className={`${isScrolled ? 'w-8 h-8' : 'w-9 h-9'} bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-sm transition-[width,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none`}>
            <span className="font-black text-lg leading-none">S</span>
          </div>
          <span>SampleVC</span>
        </Link>
        <div className="hidden md:flex items-center gap-1 text-sm font-semibold">
          {sectionLinks.map(({ id, label, icon: Icon }) => (
            <a key={id} href={isHome ? `#${id}` : `/#${id}`} className={getSectionLinkClass(id)} aria-current={activeSection === id ? 'location' : undefined}>
              <Icon size={16} strokeWidth={1.8} />{label}
            </a>
          ))}
          <Link href="/submissions" className={`flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${pathname === '/submissions' ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`} aria-current={pathname === '/submissions' ? 'page' : undefined}>
            <LuClipboardList size={16} strokeWidth={1.8} />Submissions
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/apply" className={`bg-brand-500 hover:bg-brand-600 text-white rounded-full text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none hover:-translate-y-0.5 ${isScrolled ? 'px-4 sm:px-5 py-2.5' : 'px-5 sm:px-6 py-3'}`}>
          Apply Now
          </Link>
          <button type="button" className="md:hidden w-11 h-11 grid place-items-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <LuX size={20} /> : <LuMenu size={20} />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className={`md:hidden border-t px-6 py-3 ${isScrolled ? 'border-white/50 bg-white/65 backdrop-blur-xl' : 'border-gray-200 bg-white'} shadow-lg`}>
          <div className="mx-auto max-w-7xl space-y-1">
            {sectionLinks.map(({ id, label, icon: Icon }) => (
              <a key={id} href={isHome ? `#${id}` : `/#${id}`} onClick={() => setMobileMenuOpen(false)} className={`${getSectionLinkClass(id)} w-full`} aria-current={activeSection === id ? 'location' : undefined}>
                <Icon size={18} strokeWidth={1.8} />{label}
              </a>
            ))}
            <Link href="/submissions" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 rounded-full px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
              <LuClipboardList size={18} strokeWidth={1.8} />Submissions
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
