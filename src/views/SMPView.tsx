import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Award,
  BookOpen,
  Monitor,
  HeartPulse,
  Sparkles,
  Trophy,
  Building,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Phone,
} from 'lucide-react';

export const SMPView: React.FC = () => {
  const { schoolUnits, galleryList, setActivePage } = useApp();
  const smp = schoolUnits.smp;
  const smpGallery = galleryList.filter((g) => g.category === 'Kegiatan SMP' || g.category === 'Pramuka');

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Banner for SMP */}
      <section className="relative bg-navy-950 text-white overflow-hidden py-16 sm:py-24 border-b border-navy-800">
        <div className="absolute inset-0">
          <img
            src={smp.heroImage}
            alt={smp.name}
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md text-xs font-bold uppercase bg-amber-400 text-navy-950 shadow-sm">
              Jenjang SMP
            </span>
            <span className="text-xs text-amber-300 font-semibold">
              Terakreditasi B · Berdiri 1975
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            {smp.fullName}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Membentuk tunas bangsa yang berakhlak mulia, cerdas, berkarakter disiplin, dan memiliki
            dasar keilmuan yang kokoh menyongsong masa depan.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActivePage('ppdb')}
              className="px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-navy-950 shadow-lg shadow-amber-500/20 transition-all"
            >
              Daftar PPDB SMP 2026
            </button>
            <a
              href={`https://wa.me/62${smp.phone.replace(/^0/, '')}?text=Halo%20SMP%20Catur%20Sakti,%20saya%20ingin%20informasi%20pendaftaran.`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl text-xs font-semibold tracking-wide bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Hubungi Panitia ({smp.phone})</span>
            </a>
          </div>

          {/* Quick Stats Grid */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            <div className="p-3.5 rounded-xl bg-navy-900/80 border border-navy-700">
              <div className="text-xs text-slate-400">NPSN Resmi</div>
              <div className="text-lg font-bold text-amber-400 tabular-nums">{smp.npsn}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-navy-900/80 border border-navy-700">
              <div className="text-xs text-slate-400">Akreditasi Sekolah</div>
              <div className="text-lg font-bold text-amber-400">{smp.accreditation} (BAN-S/M)</div>
            </div>
            <div className="p-3.5 rounded-xl bg-navy-900/80 border border-navy-700">
              <div className="text-xs text-slate-400">Tahun Berdiri</div>
              <div className="text-lg font-bold text-amber-400 tabular-nums">{smp.establishedYear}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-navy-900/80 border border-navy-700">
              <div className="text-xs text-slate-400">Kurikulum</div>
              <div className="text-lg font-bold text-amber-400">Kurikulum Merdeka</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. PROFIL SEKOLAH */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5 text-navy-800" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
                Tentang Satuan
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
                Profil SMP Catur Sakti
              </h2>
            </div>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            {smp.description}
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-900">Legalitas & Status:</strong> SMP Catur Sakti terdaftar resmi
              di Kementerian Pendidikan Dasar dan Menengah dengan Nomor Pokok Sekolah Nasional (NPSN) 10806049,
              berdiri sejak tahun 1975 di Desa Sukaraja Tiga, Margatiga, Lampung Timur.
            </div>
          </div>
        </section>

        {/* 2. PROGRAM PENDIDIKAN & KURIKULUM */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
              Akademik & Karakter
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
              Program Pendidikan Unggulan
            </h2>
            <p className="text-sm text-slate-500">
              Kurikulum dirancang untuk membangkitkan rasa ingin tahu, kecintaan belajar, dan nilai moralitas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {smp.programs.map((prog, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-amber-400/50 hover:bg-amber-50/20 transition-all space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-navy-900 text-amber-400 font-bold text-sm flex items-center justify-center">
                  0{idx + 1}
                </div>
                <h3 className="font-display font-bold text-lg text-navy-900">{prog.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{prog.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. FASILITAS SEKOLAH */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
              Sarana & Prasarana
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
              Fasilitas Penunjang Pembelajaran
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {smp.facilities.map((fac, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-4 h-4 text-amber-700" />
                  </div>
                  <h4 className="font-bold text-sm text-navy-900">{fac.name}</h4>
                </div>
                <p className="text-xs text-slate-600 pl-11 leading-relaxed">{fac.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. EKSTRAKURIKULER & KEGIATAN SISWA */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
              Pengembangan Diri
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
              Kegiatan Siswa & Ekstrakurikuler
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {smp.extracurriculars.map((ekstra, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-navy-900 text-amber-400 flex items-center justify-center font-bold shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600">
                    {ekstra.category}
                  </span>
                  <h4 className="font-bold text-sm text-navy-900">{ekstra.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{ekstra.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. PRESTASI SISWA SMP */}
        <section className="bg-gradient-to-br from-navy-900 to-navy-950 text-white rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
                Rekam Prestasi
              </span>
              <h2 className="text-2xl font-display font-bold text-white">
                Capaian Prestasi Siswa SMP Catur Sakti
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {smp.achievements.map((ach, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-navy-800/80 border border-navy-700 space-y-2"
              >
                <span className="text-xs font-bold text-amber-400 uppercase">{ach.rank}</span>
                <h4 className="text-sm font-bold text-white leading-snug">{ach.title}</h4>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-navy-700/60">
                  <span>{ach.organizer}</span>
                  <span>{ach.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. GALERI FOTO SMP */}
        {smpGallery.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
                  Dokumentasi
                </span>
                <h2 className="text-2xl font-display font-bold text-navy-900">
                  Galeri Foto Kegiatan SMP
                </h2>
              </div>
              <button
                onClick={() => setActivePage('galeri')}
                className="text-xs font-bold text-navy-900 hover:text-amber-600 flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {smpGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActivePage('galeri')}
                  className="relative h-56 rounded-xl overflow-hidden cursor-pointer group shadow-sm bg-slate-900"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-semibold">{item.title}</p>
                    <p className="text-[10px] text-amber-400">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. PPDB SMP CTA BANNER */}
        <section className="bg-amber-400 text-navy-950 rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-display font-extrabold text-navy-950">
              Pendaftaran Siswa Baru SMP Catur Sakti
            </h3>
            <p className="text-xs sm:text-sm text-navy-900 font-medium max-w-xl">
              Telah dibuka PPDB SMP Catur Sakti Tahun Ajaran 2026/2027. Kuota terbatas. Dapatkan
              kemudahan pendaftaran online sekarang juga.
            </p>
          </div>
          <button
            onClick={() => setActivePage('ppdb')}
            className="px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider bg-navy-950 hover:bg-navy-900 text-white shadow-md transition-all shrink-0"
          >
            Formulir PPDB SMP
          </button>
        </section>
      </div>
    </div>
  );
};
