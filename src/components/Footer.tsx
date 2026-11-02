import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, MapPin, Phone, Mail, Instagram, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { foundation, schoolUnits, setActivePage } = useApp();

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800">
      {/* Upper Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Identity & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-navy-950 font-bold shadow-md">
                <GraduationCap className="w-6 h-6 text-navy-950" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white tracking-tight">
                  {foundation.name}
                </h3>
                <p className="text-xs text-amber-400 font-medium">Margatiga, Lampung Timur</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              {foundation.tagline}. Berkomitmen menyelenggarakan pendidikan terpercaya sejak 1975
              guna melahirkan putra-putri bangsa yang berakhlak mulia, cerdas, dan siap bersaing.
            </p>

            <div className="pt-2">
              <a
                href={foundation.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-navy-900 border border-navy-700 text-xs font-medium text-slate-200 hover:text-amber-400 hover:border-amber-400/50 transition-colors"
              >
                <Instagram className="w-4 h-4 text-amber-400" />
                <span>@yayasancatursakti</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Col 2: Satuan Pendidikan (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Satuan Pendidikan
            </h4>
            <div className="space-y-4 text-sm">
              <div className="p-3.5 rounded-lg bg-navy-900/60 border border-navy-800 hover:border-amber-400/40 transition-colors">
                <button
                  onClick={() => setActivePage('smp')}
                  className="font-semibold text-white hover:text-amber-300 text-left w-full transition-colors"
                >
                  {schoolUnits.smp.name}
                </button>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <span>NPSN: {schoolUnits.smp.npsn}</span>
                  <span>·</span>
                  <span>Akreditasi: {schoolUnits.smp.accreditation}</span>
                </div>
                <div className="text-xs text-amber-400/80 mt-0.5">
                  Berdiri Sejak {schoolUnits.smp.establishedYear}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-navy-900/60 border border-navy-800 hover:border-amber-400/40 transition-colors">
                <button
                  onClick={() => setActivePage('sma')}
                  className="font-semibold text-white hover:text-amber-300 text-left w-full transition-colors"
                >
                  {schoolUnits.sma.name}
                </button>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <span>NPSN: {schoolUnits.sma.npsn}</span>
                  <span>·</span>
                  <span>Akreditasi: {schoolUnits.sma.accreditation}</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Jurusan MIPA & IPS · Kesiapan PTN
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Navigasi Cepat (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => setActivePage('beranda')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('profil')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Profil & Sejarah
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('berita')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Berita & Prestasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('galeri')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Galeri Foto & Video
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('ppdb')}
                  className="text-amber-400 font-semibold hover:text-amber-300 transition-colors"
                >
                  PPDB Online 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('kontak')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Kontak & Lokasi
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Informasi Kontak & Alamat (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Alamat & Kontak
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-slate-400">
                  {foundation.address}, {foundation.subdistrict}, {foundation.district},{' '}
                  {foundation.province} {foundation.postalCode}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`https://wa.me/62${foundation.phone.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-300 hover:text-amber-400 transition-colors"
                >
                  {foundation.phone} (WhatsApp/Telepon)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${foundation.email}`}
                  className="text-xs text-slate-300 hover:text-amber-400 transition-colors"
                >
                  {foundation.email}
                </a>
              </div>

              <div className="pt-2 text-xs text-slate-500 border-t border-navy-800">
                <p>Ketua Pimpinan: <span className="text-slate-300">{foundation.leaderName}</span></p>
                <p>Operator: <span className="text-slate-300">{foundation.operatorName}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-navy-900 bg-navy-950/80 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© 2026 Yayasan Catur Sakti. All Rights Reserved.</p>
          <p className="text-slate-500">
            SMP Catur Sakti (NPSN: 10806049) · SMA Catur Sakti Margatiga (NPSN: 10806032)
          </p>
        </div>
      </div>
    </footer>
  );
};
