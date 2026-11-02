import React, { useState, useEffect } from 'react';
import { useApp, ActivePage } from '../context/AppContext';
import { Menu, X, Shield, GraduationCap, ChevronRight, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activePage, setActivePage, foundation, adminUser } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: ActivePage; label: string }[] = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil Yayasan' },
    { id: 'smp', label: 'SMP Catur Sakti' },
    { id: 'sma', label: 'SMA Catur Sakti' },
    { id: 'berita', label: 'Berita & Info' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top micro bar for institutional trust */}
      <div className="bg-navy-950 text-slate-300 text-xs py-1.5 px-4 border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-semibold tracking-wide">
              NPSN SMP: 10806049
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-semibold tracking-wide">
              NPSN SMA: 10806032
            </span>
            <span className="hidden sm:inline text-slate-600">·</span>
            <span className="hidden sm:inline text-slate-400">
              Margatiga, Lampung Timur
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a
              href="tel:082235174743"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>082235174743</span>
            </a>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1 hover:text-amber-300 transition-colors text-xs ${
                activePage === 'admin' ? 'text-amber-400 font-bold' : 'text-slate-400'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{adminUser ? adminUser.roleLabel : 'Portal Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-navy-900/95 backdrop-blur-md shadow-lg border-b border-navy-800 py-3'
            : 'bg-navy-900 border-b border-navy-800/80 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Brand Zone: 1-line Wordmark with Emblem */}
          <button
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3 text-left shrink-0 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-navy-950 font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-navy-950" />
            </div>
            <div className="whitespace-nowrap">
              <div className="font-display font-bold text-lg sm:text-xl text-white tracking-tight group-hover:text-amber-300 transition-colors">
                {foundation.name}
              </div>
              <div className="text-[11px] text-amber-400/90 font-medium tracking-wider uppercase">
                Margatiga · Lampung Timur
              </div>
            </div>
          </button>

          {/* Navigation Links: Clean typography */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary Action Button */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('ppdb')}
              className="px-5 py-2.5 rounded-lg text-xs uppercase font-bold tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-navy-950 shadow-md shadow-amber-500/20 hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
            >
              PPDB Online 2026
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('ppdb')}
              className="px-3 py-1.5 rounded-md text-xs font-bold bg-amber-400 text-navy-950 shadow-sm whitespace-nowrap"
            >
              PPDB
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-navy-800 transition-colors"
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-navy-800 bg-navy-950/98 backdrop-blur-xl px-4 py-4 animate-fadeIn">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                      isActive
                        ? 'bg-navy-800 text-amber-400 font-semibold'
                        : 'text-slate-200 hover:bg-navy-800/60'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                );
              })}
              <div className="pt-3 border-t border-navy-800">
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-navy-800"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>{adminUser ? adminUser.roleLabel : 'Portal Admin Yayasan'}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
