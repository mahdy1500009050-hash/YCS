import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Award,
  BookOpen,
  Users,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Building2,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { foundation, schoolUnits, newsList, galleryList, setActivePage, setSelectedNews } = useApp();

  const latestNews = newsList.slice(0, 3);
  const featuredGallery = galleryList.slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden bg-navy-950 text-white">
        {/* Background Image with Dark Navy Scrim */}
        <div className="absolute inset-0">
          <img
            src={foundation.bannerPhoto}
            alt="Kampus Yayasan Catur Sakti"
            className="w-full h-full object-cover object-center scale-105 transform animate-fadeSlow"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                '/src/assets/images/hero_school_campus_1793635167351.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/85 to-navy-950/60" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-navy-950/70" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full z-10">
          <div className="max-w-3xl space-y-6">
            {/* Trust badge kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Institusi Pendidikan Terpercaya Sejak 1975</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.15] text-balance">
              Selamat Datang di <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                Yayasan Catur Sakti
              </span>
            </h1>

            <p className="text-lg sm:text-xl font-medium text-amber-100/90 leading-snug">
              Mewujudkan Pendidikan Berkualitas untuk Generasi Masa Depan.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Yayasan Catur Sakti berkomitmen menyelenggarakan pendidikan yang berkualitas,
              membangun karakter, mengembangkan potensi peserta didik, serta menciptakan generasi
              yang cerdas, mandiri, dan berprestasi.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActivePage('ppdb')}
                className="px-7 py-3.5 rounded-xl text-sm uppercase font-bold tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-navy-950 shadow-xl shadow-amber-500/25 transition-all transform active:scale-95 flex items-center gap-2"
              >
                <span>Informasi PPDB</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActivePage('profil')}
                className="px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wide bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-sm transition-all"
              >
                Kenali Kami
              </button>
            </div>

            {/* Micro accreditation footer */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>SMP Catur Sakti (NPSN 10806049 · Akreditasi B)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>SMA Catur Sakti (NPSN 10806032 · Akreditasi B)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & INSTITUTIONAL PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          <div className="pt-4 lg:pt-0 lg:px-4 text-center sm:text-left space-y-1">
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-navy-900 tabular-nums">
              1975
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-600">
              Tahun Berdiri
            </div>
            <p className="text-xs text-slate-500">
              Lebih dari 50 tahun konsisten mendidik putra-putri Margatiga.
            </p>
          </div>

          <div className="pt-4 lg:pt-0 lg:px-4 text-center sm:text-left space-y-1">
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-navy-900 tabular-nums">
              2 Unit
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-600">
              Satuan Pendidikan
            </div>
            <p className="text-xs text-slate-500">
              SMP Catur Sakti dan SMA Catur Sakti terintegrasi dalam satu naungan.
            </p>
          </div>

          <div className="pt-4 lg:pt-0 lg:px-4 text-center sm:text-left space-y-1">
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-navy-900">
              B
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-600">
              Akreditasi Resmi
            </div>
            <p className="text-xs text-slate-500">
              Terakreditasi BAN-S/M dengan sarana prasarana yang memadai.
            </p>
          </div>

          <div className="pt-4 lg:pt-0 lg:px-4 text-center sm:text-left space-y-1">
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-navy-900 tabular-nums">
              100%
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-600">
              Komitmen Karakter
            </div>
            <p className="text-xs text-slate-500">
              Menyeimbangkan keilmuan akademik, budi pekerti, dan kepemimpinan.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SAMBUTAN KETUA PIMPINAN YAYASAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-navy-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-navy-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Leader Image */}
            <div className="lg:col-span-5 relative h-80 sm:h-96 lg:h-full min-h-[380px] bg-slate-950">
              <img
                src={foundation.leaderPhoto}
                alt={foundation.leaderName}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    '/src/assets/images/foundation_head_1793635169251.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 lg:hidden text-white">
                <p className="font-bold text-lg">{foundation.leaderName}</p>
                <p className="text-xs text-amber-400">{foundation.leaderTitle}</p>
              </div>
            </div>

            {/* Speech Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Sambutan Pimpinan Yayasan</span>
              </div>

              <blockquote className="text-lg sm:text-xl font-display text-slate-100 italic leading-relaxed">
                "{foundation.leaderMessage}"
              </blockquote>

              <div className="pt-2 border-t border-slate-700/80 hidden lg:block">
                <h3 className="font-display font-bold text-xl text-white">
                  {foundation.leaderName}
                </h3>
                <p className="text-sm text-amber-400 font-medium">
                  {foundation.leaderTitle} Yayasan Catur Sakti
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Didukung Operator Yayasan: {foundation.operatorName}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActivePage('profil')}
                  className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 font-semibold group transition-colors"
                >
                  <span>Baca Visi & Misi Yayasan Selengkapnya</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DUA SATUAN PENDIDIKAN (SMP & SMA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
            Jenjang Pendidikan
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 tracking-tight">
            Satuan Pendidikan di Bawah Naungan Yayasan
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Dua lembaga pendidikan yang saling bersinergi menghantarkan putra-putri Anda dari jenjang
            menengah pertama hingga menengah atas yang siap berkarya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card SMP */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all group">
            <div>
              <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                <img
                  src={schoolUnits.smp.heroImage}
                  alt={schoolUnits.smp.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md text-xs font-bold uppercase bg-navy-900 text-white shadow-md">
                    Jenjang SMP
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <span>NPSN: {schoolUnits.smp.npsn}</span>
                  <span>Akreditasi: {schoolUnits.smp.accreditation}</span>
                  <span>Berdiri: {schoolUnits.smp.establishedYear}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="text-2xl font-display font-bold text-navy-900 group-hover:text-amber-600 transition-colors">
                  {schoolUnits.smp.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {schoolUnits.smp.description}
                </p>

                <div className="pt-2 space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Program Unggulan:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {schoolUnits.smp.programs.slice(0, 3).map((prog, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{prog.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 sm:px-8 sm:pb-8 pt-0 flex items-center gap-3">
              <button
                onClick={() => setActivePage('smp')}
                className="flex-1 py-3 rounded-xl text-xs uppercase font-bold tracking-wider bg-navy-900 hover:bg-navy-800 text-white text-center transition-colors"
              >
                Lihat Profil SMP
              </button>
              <button
                onClick={() => setActivePage('ppdb')}
                className="px-4 py-3 rounded-xl text-xs uppercase font-bold tracking-wider bg-amber-400 hover:bg-amber-300 text-navy-950 transition-colors"
              >
                Daftar SMP
              </button>
            </div>
          </div>

          {/* Card SMA */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all group">
            <div>
              <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                <img
                  src={schoolUnits.sma.heroImage}
                  alt={schoolUnits.sma.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md text-xs font-bold uppercase bg-amber-500 text-navy-950 shadow-md">
                    Jenjang SMA
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <span>NPSN: {schoolUnits.sma.npsn}</span>
                  <span>Akreditasi: {schoolUnits.sma.accreditation}</span>
                  <span>Margatiga</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="text-2xl font-display font-bold text-navy-900 group-hover:text-amber-600 transition-colors">
                  {schoolUnits.sma.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {schoolUnits.sma.description}
                </p>

                <div className="pt-2 space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Program Unggulan:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {schoolUnits.sma.programs.slice(0, 3).map((prog, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{prog.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 sm:px-8 sm:pb-8 pt-0 flex items-center gap-3">
              <button
                onClick={() => setActivePage('sma')}
                className="flex-1 py-3 rounded-xl text-xs uppercase font-bold tracking-wider bg-navy-900 hover:bg-navy-800 text-white text-center transition-colors"
              >
                Lihat Profil SMA
              </button>
              <button
                onClick={() => setActivePage('ppdb')}
                className="px-4 py-3 rounded-xl text-xs uppercase font-bold tracking-wider bg-amber-400 hover:bg-amber-300 text-navy-950 transition-colors"
              >
                Daftar SMA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BERITA & PENGUMUMAN TERBARU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
              Warta & Agenda
            </span>
            <h2 className="text-3xl font-display font-bold text-navy-900 tracking-tight mt-1">
              Berita & Informasi Terbaru
            </h2>
          </div>
          <button
            onClick={() => setActivePage('berita')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-amber-600 transition-colors"
          >
            <span>Lihat Semua Berita</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedNews(article)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-200/80 overflow-hidden flex flex-col justify-between cursor-pointer group transition-all"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-white/90 text-navy-900 px-2.5 py-1 rounded shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-display font-bold text-base text-navy-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 group-hover:text-amber-700">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. GALERI SOROTAN */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
                Dokumentasi
              </span>
              <h2 className="text-3xl font-display font-bold text-navy-900 tracking-tight mt-1">
                Galeri Aktivitas Siswa & Yayasan
              </h2>
            </div>
            <button
              onClick={() => setActivePage('galeri')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-amber-600 transition-colors"
            >
              <span>Buka Galeri Foto Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setActivePage('galeri')}
                className="relative h-64 rounded-xl overflow-hidden group cursor-pointer shadow-md bg-slate-900"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold text-amber-400">
                    {item.category}
                  </span>
                  <p className="text-xs font-semibold text-white line-clamp-2 mt-0.5">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER PPDB 2026/2027 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-navy-700/60 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
              Penerimaan Siswa Baru TA 2026/2027
            </span>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
              Siap Menjadi Bagian dari Keluarga Besar Catur Sakti?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Daftarkan putra-putri Anda sekarang di SMP Catur Sakti atau SMA Catur Sakti Margatiga.
              Tersedia beasiswa prestasi dan jalur reguler dengan pendampingan panitia secara penuh.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActivePage('ppdb')}
                className="px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-navy-950 shadow-lg shadow-amber-500/25 transition-all"
              >
                Daftar Online Sekarang
              </button>
              <a
                href={`https://wa.me/62${foundation.phone.replace(/^0/, '')}?text=Halo%20Panitia%20PPDB%20Yayasan%20Catur%20Sakti,%20saya%20ingin%20bertanya%20mengenai%20pendaftaran.`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl text-xs font-semibold tracking-wide bg-navy-800 hover:bg-navy-700 text-white border border-navy-600 transition-colors"
              >
                Konsultasi WhatsApp (082235174743)
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
