import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SchoolUnitType, PPDBRegistrant } from '../types';
import { validateNISN, validateNIK, validatePhone } from '../utils/ppdb';
import {
  FileText,
  CheckCircle2,
  Calendar,
  Clock,
  Phone,
  AlertCircle,
  Search,
  Upload,
  ArrowRight,
  Shield,
  HelpCircle,
  Download,
  Printer,
  Sparkles,
} from 'lucide-react';

type PPDBTab = 'info' | 'daftar' | 'status';

export const PPDBView: React.FC = () => {
  const { foundation, schoolUnits, addRegistrant, registrants } = useApp();
  const [activeTab, setActiveTab] = useState<PPDBTab>('info');

  // Form State
  const [targetUnit, setTargetUnit] = useState<SchoolUnitType>('sma');
  const [fullName, setFullName] = useState('');
  const [nisn, setNisn] = useState('');
  const [nik, setNik] = useState('');
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [religion, setReligion] = useState('Islam');
  const [address, setAddress] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentJob, setParentJob] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  const [smaMajor, setSmaMajor] = useState<'MIPA' | 'IPS' | 'Belum Ditentukan'>('MIPA');
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([
    'Kartu Keluarga (KK)',
    'Akta Kelahiran',
  ]);

  // Status Check State
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResult] = useState<PPDBRegistrant | null | 'not_found'>(null);

  // Form errors & submission outcome
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<PPDBRegistrant | null>(null);

  const handleDocumentToggle = (docName: string) => {
    if (uploadedDocs.includes(docName)) {
      setUploadedDocs(uploadedDocs.filter((d) => d !== docName));
    } else {
      setUploadedDocs([...uploadedDocs, docName]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Nama lengkap wajib diisi';
    if (!birthPlace.trim()) newErrors.birthPlace = 'Tempat lahir wajib diisi';
    if (!birthDate.trim()) newErrors.birthDate = 'Tanggal lahir wajib diisi';
    if (!address.trim()) newErrors.address = 'Alamat tinggal wajib diisi';
    if (!parentName.trim()) newErrors.parentName = 'Nama orang tua/wali wajib diisi';
    if (!previousSchool.trim()) newErrors.previousSchool = 'Asal sekolah wajib diisi';

    const nisnValidation = validateNISN(nisn);
    if (!nisnValidation.isValid) newErrors.nisn = nisnValidation.error!;

    const nikValidation = validateNIK(nik);
    if (!nikValidation.isValid) newErrors.nik = nikValidation.error!;

    const phoneValidation = validatePhone(parentPhone);
    if (!phoneValidation.isValid) newErrors.parentPhone = phoneValidation.error!;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const saved = addRegistrant({
      targetUnit,
      fullName: fullName.trim(),
      nisn: nisn.trim(),
      nik: nik.trim(),
      gender,
      birthPlace: birthPlace.trim(),
      birthDate,
      religion,
      address: address.trim(),
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim(),
      parentJob: parentJob.trim() || 'Wiraswasta / Lainnya',
      previousSchool: previousSchool.trim(),
      smaMajorPreference: targetUnit === 'sma' ? smaMajor : undefined,
      documentsUploaded: uploadedDocs,
    });

    setSubmittedData(saved);
  };

  const handleSearchStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchKey.trim()) return;

    const query = searchKey.trim().toLowerCase();
    const found = registrants.find(
      (r) =>
        r.registrationNumber.toLowerCase() === query ||
        r.nisn.toLowerCase() === query ||
        r.nik === query
    );

    if (found) {
      setSearchResult(found);
    } else {
      setSearchResult('not_found');
    }
  };

  const handlePrintProof = () => {
    window.print();
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-14 sm:py-18 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <span>Tahun Ajaran 2026/2027</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Penerimaan Peserta Didik Baru (PPDB) Online
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            Sistem pendaftaran terpadu SMP Catur Sakti & SMA Catur Sakti Margatiga. Cepat, transparan,
            dan terhubung langsung dengan panitia penerimaan siswa baru.
          </p>

          {/* Quick tab switcher */}
          <div className="pt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'info'
                  ? 'bg-amber-400 text-navy-950 shadow-md'
                  : 'bg-navy-900 text-slate-300 hover:bg-navy-800'
              }`}
            >
              1. Informasi & Jadwal
            </button>
            <button
              onClick={() => setActiveTab('daftar')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'daftar'
                  ? 'bg-amber-400 text-navy-950 shadow-md'
                  : 'bg-navy-900 text-slate-300 hover:bg-navy-800'
              }`}
            >
              2. Formulir Pendaftaran
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'status'
                  ? 'bg-amber-400 text-navy-950 shadow-md'
                  : 'bg-navy-900 text-slate-300 hover:bg-navy-800'
              }`}
            >
              3. Cek Status Pendaftaran
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================== */}
        {/* TAB 1: INFORMASI, JADWAL & ALUR PPDB */}
        {/* ============================================================== */}
        {activeTab === 'info' && (
          <div className="space-y-12">
            {/* Alur Pendaftaran */}
            <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
                  Tahapan
                </span>
                <h2 className="text-2xl font-display font-bold text-navy-900">
                  Alur Pendaftaran Peserta Didik Baru
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3 relative">
                  <div className="w-8 h-8 rounded-lg bg-navy-900 text-amber-400 font-bold text-sm flex items-center justify-center">
                    1
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm">Pengisian Formulir Online</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Calon siswa atau orang tua mengisi data diri, data orang tua, dan pilihan jenjang (SMP/SMA) pada formulir online.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3 relative">
                  <div className="w-8 h-8 rounded-lg bg-navy-900 text-amber-400 font-bold text-sm flex items-center justify-center">
                    2
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm">Mendapatkan Nomor Registrasi</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Sistem menerbitkan bukti pendaftaran dengan kode registrasi resmi untuk memantau status secara berkala.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3 relative">
                  <div className="w-8 h-8 rounded-lg bg-navy-900 text-amber-400 font-bold text-sm flex items-center justify-center">
                    3
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm">Verifikasi Berkas Panitia</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Panitia PPDB memeriksa kelengkapan berkas fisik / digital dan menghubungi via WhatsApp jika diperlukan.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3 relative">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center">
                    4
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm">Pengumuman & Daftar Ulang</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Siswa yang diterima melakukan daftar ulang dan pengukuran seragam di kampus Catur Sakti Margatiga.
                  </p>
                </div>
              </div>
            </div>

            {/* Syarat Pendaftaran & Jadwal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Syarat */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
                <h3 className="text-xl font-display font-bold text-navy-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                  <span>Persyaratan Pendaftaran</span>
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Lulus SD/MI (untuk pendaftar SMP Catur Sakti).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Lulus SMP/MTs (untuk pendaftar SMA Catur Sakti Margatiga).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Fotokopi Kartu Keluarga (KK) dan Akta Kelahiran.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Fotokopi Ijazah / Surat Keterangan Lulus (SKL) yang telah dilegalisir.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Pas foto ukuran 3x4 (3 lembar).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Piagam/Sertifikat prestasi akademik atau non-akademik (khusus jalur beasiswa prestasi).</span>
                  </li>
                </ul>
              </div>

              {/* Jadwal */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
                <h3 className="text-xl font-display font-bold text-navy-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  <span>Jadwal Pelaksanaan PPDB 2026</span>
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between border border-slate-100">
                    <div>
                      <div className="font-semibold text-navy-900">Gelombang I (Jalur Prestasi & Reguler Awal)</div>
                      <div className="text-xs text-slate-500">Mendapatkan potongan beasiswa SPP</div>
                    </div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded">
                      Jan – April 2026
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between border border-slate-100">
                    <div>
                      <div className="font-semibold text-navy-900">Gelombang II (Jalur Reguler Utama)</div>
                      <div className="text-xs text-slate-500">Hingga kuota kelas terpenuhi</div>
                    </div>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                      Mei – Juli 2026
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between border border-slate-100">
                    <div>
                      <div className="font-semibold text-navy-900">Masa Pengenalan Lingkungan Sekolah (MPLS)</div>
                      <div className="text-xs text-slate-500">Orientasi terpadu SMP & SMA Catur Sakti</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                      Juli 2026
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('daftar')}
                    className="w-full py-3 rounded-xl text-xs uppercase font-bold tracking-wider bg-navy-900 hover:bg-navy-800 text-white text-center transition-colors shadow-md"
                  >
                    Buka Formulir Pendaftaran Sekarang
                  </button>
                </div>
              </div>
            </div>

            {/* Hubungi Panitia WhatsApp */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-display font-bold text-xl text-white">
                  Butuh Bantuan atau Informasi Khusus PPDB?
                </h4>
                <p className="text-xs text-emerald-100 max-w-xl">
                  Panitia PPDB Yayasan Catur Sakti siap melayani pertanyaan mengenai persyaratan,
                  pemilihan jurusan SMA, maupun beasiswa melalui WhatsApp.
                </p>
              </div>
              <a
                href="https://wa.me/6282235174743?text=Halo%20Panitia%20PPDB%20Yayasan%20Catur%20Sakti,%20saya%20ingin%20konsultasi%20pendaftaran%20siswa%20baru."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider bg-white text-emerald-900 hover:bg-emerald-50 shadow-md transition-all shrink-0 flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Chat Panitia (082235174743)</span>
              </a>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: FORMULIR PENDAFTARAN ONLINE */}
        {/* ============================================================== */}
        {activeTab === 'daftar' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {submittedData ? (
              /* Success / Registration Proof Card */
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-200 space-y-6 animate-fadeIn">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <span className="text-xs uppercase tracking-widest font-bold text-emerald-600">
                    Pendaftaran Berhasil Dikirim
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
                    Bukti Tanda Terima Pendaftaran Online
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                    Simpan nomor registrasi di bawah ini untuk memeriksa status seleksi dan verifikasi berkas.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-300 text-center space-y-1">
                  <div className="text-xs uppercase tracking-widest font-bold text-amber-800">
                    Nomor Registrasi PPDB
                  </div>
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold text-navy-950 tracking-wider">
                    {submittedData.registrationNumber}
                  </div>
                  <div className="text-xs text-amber-700">
                    Pilihan Satuan: {submittedData.targetUnit === 'smp' ? 'SMP Catur Sakti' : 'SMA Catur Sakti Margatiga'}
                  </div>
                </div>

                {/* Summary Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs sm:text-sm">
                  <div className="p-3.5 flex justify-between bg-slate-50 font-medium">
                    <span className="text-slate-500">Nama Calon Siswa</span>
                    <span className="font-bold text-navy-900">{submittedData.fullName}</span>
                  </div>
                  <div className="p-3.5 flex justify-between">
                    <span className="text-slate-500">NISN / NIK</span>
                    <span className="font-mono text-navy-900">
                      {submittedData.nisn} / {submittedData.nik}
                    </span>
                  </div>
                  <div className="p-3.5 flex justify-between">
                    <span className="text-slate-500">Tempat, Tanggal Lahir</span>
                    <span className="text-navy-900">
                      {submittedData.birthPlace}, {submittedData.birthDate}
                    </span>
                  </div>
                  <div className="p-3.5 flex justify-between">
                    <span className="text-slate-500">Asal Sekolah</span>
                    <span className="text-navy-900">{submittedData.previousSchool}</span>
                  </div>
                  <div className="p-3.5 flex justify-between">
                    <span className="text-slate-500">Nama Orang Tua / Telepon</span>
                    <span className="text-navy-900">
                      {submittedData.parentName} ({submittedData.parentPhone})
                    </span>
                  </div>
                  {submittedData.smaMajorPreference && (
                    <div className="p-3.5 flex justify-between">
                      <span className="text-slate-500">Peminatan Jurusan SMA</span>
                      <span className="font-bold text-amber-700">
                        {submittedData.smaMajorPreference}
                      </span>
                    </div>
                  )}
                  <div className="p-3.5 flex justify-between">
                    <span className="text-slate-500">Status Saat Ini</span>
                    <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      {submittedData.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <button
                    onClick={handlePrintProof}
                    className="px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider bg-navy-900 hover:bg-navy-800 text-white flex items-center gap-2 shadow-md"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Cetak Bukti Pendaftaran</span>
                  </button>

                  <button
                    onClick={() => {
                      setSubmittedData(null);
                      setFullName('');
                      setNisn('');
                      setNik('');
                      setActiveTab('status');
                      setSearchKey(submittedData.registrationNumber);
                    }}
                    className="px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider bg-amber-400 hover:bg-amber-300 text-navy-950 transition-colors"
                  >
                    Cek Status Pendaftaran
                  </button>
                </div>
              </div>
            ) : (
              /* Registration Form */
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-8"
              >
                <div className="space-y-1 pb-4 border-b border-slate-100">
                  <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
                    Formulir Registrasi
                  </span>
                  <h2 className="text-2xl font-display font-bold text-navy-900">
                    Formulir Penerimaan Peserta Didik Baru 2026
                  </h2>
                  <p className="text-xs text-slate-500">
                    Pastikan seluruh data diisi dengan benar sesuai Kartu Keluarga dan dokumen sekolah asal.
                  </p>
                </div>

                {/* Section 1: Pilihan Satuan Pendidikan */}
                <div className="space-y-3">
                  <label className="block text-xs uppercase font-bold tracking-wider text-slate-700">
                    1. Pilih Jenjang Satuan Pendidikan
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setTargetUnit('smp')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        targetUnit === 'smp'
                          ? 'border-amber-500 bg-amber-50/40 text-navy-950 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-sm text-navy-900">SMP Catur Sakti</div>
                      <div className="text-xs text-slate-500 mt-1">
                        NPSN 10806049 · Berdiri 1975 · Akreditasi B
                      </div>
                      <div className="text-[11px] text-amber-700 font-semibold mt-2">
                        Untuk lulusan SD / MI sederajat
                      </div>
                    </div>

                    <div
                      onClick={() => setTargetUnit('sma')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        targetUnit === 'sma'
                          ? 'border-amber-500 bg-amber-50/40 text-navy-950 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-sm text-navy-900">SMA Catur Sakti Margatiga</div>
                      <div className="text-xs text-slate-500 mt-1">
                        NPSN 10806032 · Akreditasi B · Jurusan MIPA & IPS
                      </div>
                      <div className="text-[11px] text-amber-700 font-semibold mt-2">
                        Untuk lulusan SMP / MTs sederajat
                      </div>
                    </div>
                  </div>

                  {targetUnit === 'sma' && (
                    <div className="pt-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Pilihan Peminatan Jurusan SMA
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {(['MIPA', 'IPS', 'Belum Ditentukan'] as const).map((major) => (
                          <button
                            key={major}
                            type="button"
                            onClick={() => setSmaMajor(major)}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                              smaMajor === major
                                ? 'bg-navy-900 text-amber-400'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            Jurusan {major}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 2: Data Diri Calon Siswa */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="text-xs uppercase font-bold tracking-wider text-slate-700">
                    2. Data Diri Calon Siswa
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Nama Lengkap Sesuai Akta Kelahiran <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Contoh: Muhammad Budi Pratama"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        NISN (10 Digit Angka) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        maxLength={10}
                        value={nisn}
                        onChange={(e) => setNisn(e.target.value)}
                        placeholder="Contoh: 0081234567"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      {errors.nisn && <p className="text-xs text-rose-500 mt-1">{errors.nisn}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        NIK (16 Digit Sesuai KK) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        maxLength={16}
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        placeholder="Contoh: 1807051204110001"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      {errors.nik && <p className="text-xs text-rose-500 mt-1">{errors.nik}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Jenis Kelamin
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as 'Laki-laki' | 'Perempuan')}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Agama
                      </label>
                      <select
                        value={religion}
                        onChange={(e) => setReligion(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        <option value="Islam">Islam</option>
                        <option value="Kristen Protestan">Kristen Protestan</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Tempat Lahir <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={birthPlace}
                        onChange={(e) => setBirthPlace(e.target.value)}
                        placeholder="Contoh: Margatiga"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      {errors.birthPlace && (
                        <p className="text-xs text-rose-500 mt-1">{errors.birthPlace}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Tanggal Lahir <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      {errors.birthDate && (
                        <p className="text-xs text-rose-500 mt-1">{errors.birthDate}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Alamat Tempat Tinggal Lengkap <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Contoh: Desa Sukaraja Tiga RT 02 RW 01, Kec. Margatiga, Lampung Timur"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      {errors.address && (
                        <p className="text-xs text-rose-500 mt-1">{errors.address}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 3: Data Orang Tua / Wali */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="text-xs uppercase font-bold tracking-wider text-slate-700">
                    3. Data Orang Tua / Wali
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Nama Ayah / Ibu / Wali <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="Contoh: Slamet Riyadi"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      {errors.parentName && (
                        <p className="text-xs text-rose-500 mt-1">{errors.parentName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Nomor WhatsApp Orang Tua <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        placeholder="Contoh: 082235174743"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      {errors.parentPhone && (
                        <p className="text-xs text-rose-500 mt-1">{errors.parentPhone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Pekerjaan Orang Tua
                      </label>
                      <input
                        type="text"
                        value={parentJob}
                        onChange={(e) => setParentJob(e.target.value)}
                        placeholder="Contoh: Petani / Wiraswasta / PNS"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Asal Sekolah & Dokumen */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="text-xs uppercase font-bold tracking-wider text-slate-700">
                    4. Sekolah Asal & Kelengkapan Berkas
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Nama Asal Sekolah (SD/SMP) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={previousSchool}
                      onChange={(e) => setPreviousSchool(e.target.value)}
                      placeholder={
                        targetUnit === 'smp'
                          ? 'Contoh: SDN 1 Sukaraja Tiga'
                          : 'Contoh: SMP Catur Sakti'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    {errors.previousSchool && (
                      <p className="text-xs text-rose-500 mt-1">{errors.previousSchool}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-700">
                      Centang Berkas yang Sudah Anda Siapkan (dapat diserahkan saat daftar ulang)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {[
                        'Kartu Keluarga (KK)',
                        'Akta Kelahiran',
                        'Ijazah / SKL Sekolah Asal',
                        'Pas Foto 3x4 (3 Lembar)',
                        'Piagam / Sertifikat Prestasi (opsional)',
                      ].map((doc) => (
                        <label
                          key={doc}
                          className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100"
                        >
                          <input
                            type="checkbox"
                            checked={uploadedDocs.includes(doc)}
                            onChange={() => handleDocumentToggle(doc)}
                            className="rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                          />
                          <span className="text-slate-700">{doc}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500">
                    Dengan mengirimkan data ini, saya menyatakan seluruh informasi yang diisi adalah benar.
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-navy-950 shadow-md transition-all active:scale-95 whitespace-nowrap"
                  >
                    Kirim Pendaftaran PPDB
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: CEK STATUS PENDAFTARAN */}
        {/* ============================================================== */}
        {activeTab === 'status' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-6">
              <div className="space-y-1 text-center">
                <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
                  Status Calon Siswa
                </span>
                <h2 className="text-2xl font-display font-bold text-navy-900">
                  Cek Status Pendaftaran PPDB
                </h2>
                <p className="text-xs text-slate-500">
                  Masukkan Nomor Registrasi (contoh: REG-2026-SMA-001) atau 10 digit NISN calon siswa.
                </p>
              </div>

              <form onSubmit={handleSearchStatus} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    placeholder="Masukkan Nomor Registrasi atau NISN..."
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-amber-400 font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
                >
                  Cari Data
                </button>
              </form>

              {searchResult === 'not_found' && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs text-center space-y-1">
                  <AlertCircle className="w-5 h-5 mx-auto text-rose-600" />
                  <p className="font-semibold">Data pendaftar tidak ditemukan</p>
                  <p className="text-rose-600">
                    Pastikan nomor registrasi atau NISN yang Anda masukkan sudah benar, atau hubungi
                    panitia PPDB jika Anda baru mendaftar secara offline.
                  </p>
                </div>
              )}

              {searchResult && searchResult !== 'not_found' && (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-fadeIn">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">
                        Nomor Registrasi
                      </span>
                      <div className="font-mono font-bold text-base text-navy-900">
                        {searchResult.registrationNumber}
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        searchResult.status === 'Diterima'
                          ? 'bg-emerald-100 text-emerald-800'
                          : searchResult.status === 'Lolos Berkas'
                          ? 'bg-blue-100 text-blue-800'
                          : searchResult.status === 'Tidak Diterima'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {searchResult.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400">Nama Lengkap</span>
                      <p className="font-semibold text-navy-900">{searchResult.fullName}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Satuan Tujuan</span>
                      <p className="font-semibold text-navy-900">
                        {searchResult.targetUnit === 'smp' ? 'SMP Catur Sakti' : 'SMA Catur Sakti'}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400">NISN</span>
                      <p className="font-mono text-navy-900">{searchResult.nisn}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Tanggal Daftar</span>
                      <p className="text-navy-900">{searchResult.registrationDate}</p>
                    </div>
                  </div>

                  {searchResult.statusNotes && (
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                      <strong>Catatan Panitia:</strong> {searchResult.statusNotes}
                    </div>
                  )}

                  <div className="pt-2 text-center">
                    <a
                      href={`https://wa.me/62${foundation.phone.replace(/^0/, '')}?text=Halo%20Panitia%20PPDB,%20saya%20ingin%20konfirmasi%20pendaftaran%20${searchResult.registrationNumber}%20a.n.%20${encodeURIComponent(searchResult.fullName)}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Konfirmasi Lebih Lanjut ke Panitia via WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
