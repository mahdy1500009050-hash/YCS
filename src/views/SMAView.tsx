import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Award,
  BookOpen,
  Monitor,
  FlaskConical,
  Trophy,
  Building,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail,
  Compass,
} from 'lucide-react';

export const SMAView: React.FC = () => {
  const { schoolUnits, galleryList, setActivePage } = useApp();
  const sma = schoolUnits.sma;
  const smaGallery = galleryList.filter(
    (g) => g.category === 'Kegiatan SMA' || g.category === 'Lomba PBB' || g.category === 'Pramuka'
  );

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Banner for SMA */}
      <section className="relative bg-navy-950 text-white overflow-hidden py-16 sm:py-24 border-b border-navy-800">
        <div className="absolute inset-0">
          <img
            src={sma.heroImage}
            alt={sma.name}
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md text-xs font-bold uppercase bg-amber-400 text-navy-950 shadow-sm">
              Jenjang SMA
            </span>
            <span className="text-xs text-amber-300 font-semibold">
              Terakreditasi B · Margatiga, Lampung Timur
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            {sma.fullName}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Mempersiapkan generasi muda unggul dengan keilmuan akademik mendalam (MIPA & IPS),
            keterampilan teknologi, kedisiplinan tinggi, serta bekal menuju jenjang perguruan tinggi negeri
            maupun dunia kerja.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActivePage('ppdb')}
              className="px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-navy-950 shadow-lg shadow-amber-500/20 transition-all"
            >
              Daftar PPDB SMA 2026
            </button>
            <a
              href={`https://wa.me/62${sma.phone.replace(/^0/, '')}?text=Halo%20SMA%20Catur%20Sakti%20Margatiga,%20saya%20ingin%20informasi%20pendaftaran.`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl text-xs font-semibold tracking-wide bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>WhatsApp: {sma.phone}</span>
            </a>
          </div>

          {/* Quick Stats Grid */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            <div className="p-3.5 rounded-xl bg-navy-900/80 border border-navy-700">
              <div className="text-xs text-slate-400">NPSN SMA</div>
              <div className="text-lg font-bold text-amber-400 tabular-nums">{sma.npsn}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-navy-900/80 border border-navy-700">
              <div className="text-xs text-slate-400">Akreditasi BAN-S/M</div>
              <div className="text-lg font-bold text-amber-400">{sma.accreditation} (Baik)</div>
            </div>
            <div className="p-3.5 rounded-xl bg-navy-900/80 border border-navy-700">
              <div className="text-xs text-slate-400">Peminatan Jurusan</div>
              <div className="text-lg font-bold text-amber-400">MIPA & IPS</div>
            </div>
            <div className="p-3.5 rounded-xl bg-navy-900/80 border border-navy-700">
              <div className="text-xs text-slate-400">Fokus Lulusan</div>
              <div className="text-lg font-bold text-amber-400">PTN & Mandiri</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. PROFIL SEKOLAH & IDENTITAS */}
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
                Profil SMA Catur Sakti Margatiga
              </h2>
            </div>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            {sma.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <Phone className="w-4 h-4 text-amber-600 shrink-0" />
              <div className="text-xs">
                <span className="text-slate-500">Telepon / WhatsApp:</span>{' '}
                <strong className="text-slate-900">{sma.phone}</strong>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <Mail className="w-4 h-4 text-amber-600 shrink-0" />
              <div className="text-xs">
                <span className="text-slate-500">Email Resmi:</span>{' '}
                <strong className="text-slate-900">{sma.email}</strong>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROGRAM PENDIDIKAN & JURUSAN */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
              Peminatan Akademik
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
              Program Pendidikan & Kesiapan Karir
            </h2>
            <p className="text-sm text-slate-500">
              Didukung kurikulum fleksibel yang memfasilitasi minat riset sains maupun ilmu sosial humaniora.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sma.programs.map((prog, idx) => (
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

        {/* 3. FASILITAS LABORATORIUM & PEMBELAJARAN */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
              Infrastruktur Modern
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
              Fasilitas Laboratorium & Sarana Belajar
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sma.facilities.map((fac, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <FlaskConical className="w-4 h-4 text-amber-700" />
                  </div>
                  <h4 className="font-bold text-sm text-navy-900">{fac.name}</h4>
                </div>
                <p className="text-xs text-slate-600 pl-11 leading-relaxed">{fac.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. EKSTRAKURIKULER & ORGANISASI SISWA */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
              Kepemimpinan & Bakat
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
              Ekstrakurikuler SMA Catur Sakti
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sma.extracurriculars.map((ekstra, idx) => (
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

        {/* 5. PRESTASI SISWA SMA */}
        <section className="bg-gradient-to-br from-navy-900 to-navy-950 text-white rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
                Pencapaian Siswa
              </span>
              <h2 className="text-2xl font-display font-bold text-white">
                Prestasi Unggulan Siswa SMA Catur Sakti Margatiga
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {sma.achievements.map((ach, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-navy-800/80 border border-navy-700 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase">{ach.rank}</span>
                  <h4 className="text-sm font-bold text-white leading-snug mt-1">{ach.title}</h4>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-navy-700/60">
                  <span>{ach.organizer}</span>
                  <span>{ach.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. GALERI FOTO SMA */}
        {smaGallery.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
                  Dokumentasi
                </span>
                <h2 className="text-2xl font-display font-bold text-navy-900">
                  Galeri Foto SMA Catur Sakti
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
              {smaGallery.map((item) => (
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

        {/* 7. PPDB SMA CTA BANNER */}
        <section className="bg-amber-400 text-navy-950 rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-display font-extrabold text-navy-950">
              Pendaftaran Siswa Baru SMA Catur Sakti Margatiga
            </h3>
            <p className="text-xs sm:text-sm text-navy-900 font-medium max-w-xl">
              Lulusan SMP/MTs sederajat dapat mendaftar untuk jurusan MIPA atau IPS. Konsultasikan
              bakat dan pilihan program bersama guru BK dan panitia kami.
            </p>
          </div>
          <button
            onClick={() => setActivePage('ppdb')}
            className="px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider bg-navy-950 hover:bg-navy-900 text-white shadow-md transition-all shrink-0"
          >
            Formulir PPDB SMA
          </button>
        </section>
      </div>
    </div>
  );
};
