import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Target,
  Compass,
  Award,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  Phone,
  Mail,
  Shield,
  FileText,
} from 'lucide-react';

export const ProfilView: React.FC = () => {
  const { foundation, schoolUnits, setActivePage } = useApp();

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-16 sm:py-20 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <span>Tentang Kami</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Profil & Sejarah Yayasan Catur Sakti
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-medium">
            Membangun generasi cerdas, berkarakter luhur, dan berdaya saing sejak 1975 di Margatiga,
            Lampung Timur.
          </p>
        </div>
      </section>

      {/* Main Profile Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. SEJARAH YAYASAN */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
                Jejak Dedikasi
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
                Sejarah Singkat Yayasan Catur Sakti
              </h2>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base">
            <p className="first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:text-navy-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 leading-relaxed">
              {foundation.historyText}
            </p>
          </div>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="text-xs text-amber-600 font-bold uppercase">Tonggak Sejarah 1975</div>
              <div className="font-bold text-navy-900 text-sm mt-1">Pendirian SMP Catur Sakti</div>
              <p className="text-xs text-slate-500 mt-1">
                Lembaga pendidikan rintisan pertama yang membuka akses belajar bagi anak-anak Sukaraja Tiga dan Margatiga.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="text-xs text-amber-600 font-bold uppercase">Pengembangan Lanjutan</div>
              <div className="font-bold text-navy-900 text-sm mt-1">Pendirian SMA Catur Sakti Margatiga</div>
              <p className="text-xs text-slate-500 mt-1">
                Menyediakan pendidikan menengah atas berkualitas dengan fokus persiapan ke perguruan tinggi dan kemandirian.
              </p>
            </div>
          </div>
        </section>

        {/* 2. VISI & MISI */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visi */}
          <div className="lg:col-span-5 bg-navy-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold">
              <Compass className="w-4 h-4" />
              <span>Visi Yayasan</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
              Visi Pendidikan Catur Sakti
            </h3>
            <blockquote className="text-base text-slate-200 italic leading-relaxed border-l-2 border-amber-400 pl-4 py-1">
              "{foundation.visionText}"
            </blockquote>

            <div className="pt-4 text-xs text-slate-400 border-t border-navy-800">
              Visi ini menjadi kompas seluruh pendidik dan staf di SMP dan SMA Catur Sakti.
            </div>
          </div>

          {/* Misi */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm border border-slate-200/80">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-600 font-bold">
              <Target className="w-4 h-4" />
              <span>Misi Yayasan</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-navy-900">
              Langkah Nyata Mencapai Visi
            </h3>
            <ul className="space-y-3 pt-2">
              {foundation.missionList.map((misi, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{misi}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. TUJUAN PENDIDIKAN */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
                Orientasi Mutu
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
                Tujuan Penyelenggaraan Pendidikan
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {foundation.educationGoals.map((goal, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed">{goal}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. STRUKTUR ORGANISASI & PENGELOLA YAYASAN */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
              Tata Kelola
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
              Struktur Organisasi & Pengelola Yayasan
            </h2>
            <p className="text-sm text-slate-500">
              Pengurus resmi yang memimpin tata kelola dan operasional Yayasan Catur Sakti.
            </p>
          </div>

          {/* Pengurus Utama */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ketua Pimpinan */}
            <div className="bg-gradient-to-b from-navy-900 to-navy-950 text-white rounded-2xl p-6 text-center space-y-4 shadow-md border border-navy-800">
              <div className="w-24 h-24 rounded-full mx-auto overflow-hidden border-2 border-amber-400 bg-slate-800">
                <img
                  src={foundation.leaderPhoto}
                  alt={foundation.leaderName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-white">
                  {foundation.leaderName}
                </h4>
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider mt-0.5">
                  {foundation.leaderTitle}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Penanggung jawab umum kebijakan lembaga dan penjaminan mutu pendidikan.
                </p>
              </div>
            </div>

            {/* Operator Yayasan */}
            <div className="bg-slate-50 rounded-2xl p-6 text-center space-y-4 border border-slate-200">
              <div className="w-24 h-24 rounded-full mx-auto overflow-hidden bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xl border-2 border-slate-300">
                <Users className="w-10 h-10 text-slate-500" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-navy-900">
                  {foundation.operatorName}
                </h4>
                <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider mt-0.5">
                  {foundation.operatorTitle}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Pengelola administrasi data pokok pendidikan (Dapodik), verval PTK, dan koordinasi PPDB.
                </p>
              </div>
            </div>

            {/* Satuan Pendidikan Binaan */}
            <div className="bg-slate-50 rounded-2xl p-6 text-center space-y-4 border border-slate-200 sm:col-span-2 lg:col-span-1">
              <div className="w-24 h-24 rounded-full mx-auto overflow-hidden bg-amber-50 flex items-center justify-center text-amber-700 font-bold border-2 border-amber-300">
                <GraduationCap className="w-10 h-10 text-amber-600" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-navy-900">
                  Pimpinan Satuan Pendidikan
                </h4>
                <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider mt-0.5">
                  Kepala SMP & SMA Catur Sakti
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Menjalankan operasional kurikulum, kepeserta-didikan, dan pembinaan karakter di tiap unit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. IDENTITAS RESMI & LOKASI */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
                Legalitas & Domisili
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
                Identitas Resmi Yayasan
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Nama Lembaga</span>
                <span className="font-semibold text-navy-900">{foundation.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Unit Pendidikan 1</span>
                <span className="font-semibold text-navy-900">SMP Catur Sakti (NPSN: 10806049)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Unit Pendidikan 2</span>
                <span className="font-semibold text-navy-900">SMA Catur Sakti Margatiga (NPSN: 10806032)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Tahun Berdiri Pertama</span>
                <span className="font-semibold text-navy-900">1975</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Alamat Lengkap</span>
                <span className="font-semibold text-navy-900 text-right max-w-xs">{foundation.address}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Desa / Kecamatan</span>
                <span className="font-semibold text-navy-900">Sukaraja Tiga / Margatiga</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Kabupaten / Provinsi</span>
                <span className="font-semibold text-navy-900">Lampung Timur / Lampung 34386</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Kontak Resmi</span>
                <span className="font-semibold text-navy-900">{foundation.phone}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
