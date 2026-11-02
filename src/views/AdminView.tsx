import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdminRole, PPDBStatus, NewsArticle, NewsCategory, GalleryCategory } from '../types';
import { filterRegistrants, getAdminPermissions } from '../utils/ppdb';
import {
  Shield,
  Users,
  FileText,
  Image as ImageIcon,
  Settings,
  Mail,
  CheckCircle2,
  XCircle,
  Clock,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Search,
  Download,
  Eye,
  KeyRound,
  Building,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

type AdminTab = 'overview' | 'ppdb' | 'news' | 'gallery' | 'profile' | 'messages';

export const AdminView: React.FC = () => {
  const {
    adminUser,
    loginAdmin,
    logoutAdmin,
    switchAdminRole,
    foundation,
    updateFoundation,
    schoolUnits,
    updateSchoolUnit,
    newsList,
    addNews,
    updateNews,
    deleteNews,
    galleryList,
    addGalleryItem,
    deleteGalleryItem,
    registrants,
    updateRegistrantStatus,
    contactMessages,
    setActivePage,
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Login form states (with default pre-fill for instant seamless testing)
  const [loginRole, setLoginRole] = useState<AdminRole>('super_admin');
  const [username, setUsername] = useState('admin_yayasan');
  const [password, setPassword] = useState('yayasan2026');
  const [loginError, setLoginError] = useState('');

  // PPDB filtering in admin
  const [ppdbSearch, setPpdbSearch] = useState('');
  const [ppdbUnitFilter, setPpdbUnitFilter] = useState<'all' | 'smp' | 'sma'>('all');
  const [ppdbStatusFilter, setPpdbStatusFilter] = useState('all');
  const [selectedRegistrant, setSelectedRegistrant] = useState<any | null>(null);

  // News creation / edit modal states
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsFormTitle, setNewsFormTitle] = useState('');
  const [newsFormCategory, setNewsFormCategory] = useState<NewsCategory>('Pengumuman');
  const [newsFormAuthor, setNewsFormAuthor] = useState('');
  const [newsFormImage, setNewsFormImage] = useState('');
  const [newsFormExcerpt, setNewsFormExcerpt] = useState('');
  const [newsFormContent, setNewsFormContent] = useState('');

  // Gallery creation modal state
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galTitle, setGalTitle] = useState('');
  const [galCategory, setGalCategory] = useState<GalleryCategory>('Kegiatan Yayasan');
  const [galImage, setGalImage] = useState('/src/assets/images/hero_school_campus_1793635167351.jpg');
  const [galCaption, setGalCaption] = useState('');

  // Foundation Edit form states
  const [editLeaderName, setEditLeaderName] = useState(foundation.leaderName);
  const [editLeaderMessage, setEditLeaderMessage] = useState(foundation.leaderMessage);
  const [editHistory, setEditHistory] = useState(foundation.historyText);
  const [editVision, setEditVision] = useState(foundation.visionText);
  const [editPhone, setEditPhone] = useState(foundation.phone);
  const [editEmail, setEditEmail] = useState(foundation.email);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // If not logged in, show authentication portal
  if (!adminUser) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!username || !password) {
        setLoginError('Silakan masukkan username dan password');
        return;
      }
      setLoginError('');
      loginAdmin(loginRole);
    };

    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200/80 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-navy-900 text-amber-400 mx-auto flex items-center justify-center shadow-md">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-display font-bold text-navy-900">
              Portal Administrator
            </h2>
            <p className="text-xs text-slate-500">
              Sistem Manajemen Konten & PPDB Yayasan Catur Sakti
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pilih Hak Akses (Role)
              </label>
              <select
                value={loginRole}
                onChange={(e) => {
                  const role = e.target.value as AdminRole;
                  setLoginRole(role);
                  setUsername(role === 'super_admin' ? 'admin_yayasan' : role);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="super_admin">Super Admin Yayasan (Akses Penuh)</option>
                <option value="admin_smp">Admin Satuan SMP Catur Sakti</option>
                <option value="admin_sma">Admin Satuan SMA Catur Sakti</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {loginError && <p className="text-xs text-rose-500">{loginError}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs uppercase font-bold tracking-wider bg-navy-900 hover:bg-navy-800 text-amber-400 shadow-md transition-colors"
            >
              Masuk ke Dashboard
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 text-center">
            <button
              onClick={() => setActivePage('beranda')}
              className="text-xs text-slate-400 hover:text-navy-900 transition-colors"
            >
              Kembali ke Halaman Depan
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Role permissions
  const permissions = getAdminPermissions(adminUser.role);

  // Statistics calculation
  const totalRegistrants = registrants.length;
  const smpRegistrants = registrants.filter((r) => r.targetUnit === 'smp').length;
  const smaRegistrants = registrants.filter((r) => r.targetUnit === 'sma').length;
  const pendingCount = registrants.filter((r) => r.status === 'Menunggu Verifikasi').length;
  const acceptedCount = registrants.filter((r) => r.status === 'Diterima').length;

  // Filtered registrants
  const displayedRegistrants = filterRegistrants(
    registrants,
    ppdbSearch,
    adminUser.role === 'admin_smp' ? 'smp' : adminUser.role === 'admin_sma' ? 'sma' : ppdbUnitFilter,
    ppdbStatusFilter
  );

  // Handlers for News
  const handleOpenNewArticle = () => {
    setEditingNewsId(null);
    setNewsFormTitle('');
    setNewsFormCategory('Pengumuman');
    setNewsFormAuthor(adminUser.name);
    setNewsFormImage('/src/assets/images/hero_school_campus_1793635167351.jpg');
    setNewsFormExcerpt('');
    setNewsFormContent('');
    setIsNewsModalOpen(true);
  };

  const handleEditArticle = (item: NewsArticle) => {
    setEditingNewsId(item.id);
    setNewsFormTitle(item.title);
    setNewsFormCategory(item.category);
    setNewsFormAuthor(item.author);
    setNewsFormImage(item.coverImage);
    setNewsFormExcerpt(item.excerpt);
    setNewsFormContent(item.content);
    setIsNewsModalOpen(true);
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsFormTitle.trim() || !newsFormContent.trim()) return;

    if (editingNewsId) {
      updateNews(editingNewsId, {
        title: newsFormTitle.trim(),
        category: newsFormCategory,
        author: newsFormAuthor.trim(),
        coverImage: newsFormImage.trim(),
        excerpt: newsFormExcerpt.trim() || newsFormContent.slice(0, 140) + '...',
        content: newsFormContent.trim(),
      });
    } else {
      addNews({
        title: newsFormTitle.trim(),
        slug: newsFormTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        category: newsFormCategory,
        author: newsFormAuthor.trim() || 'Humas Catur Sakti',
        coverImage: newsFormImage.trim() || '/src/assets/images/hero_school_campus_1793635167351.jpg',
        excerpt: newsFormExcerpt.trim() || newsFormContent.slice(0, 140) + '...',
        content: newsFormContent.trim(),
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        readTime: '3 menit',
      });
    }

    setIsNewsModalOpen(false);
  };

  // Handlers for Gallery
  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitle.trim()) return;

    addGalleryItem({
      title: galTitle.trim(),
      category: galCategory,
      imageUrl: galImage.trim() || '/src/assets/images/hero_school_campus_1793635167351.jpg',
      caption: galCaption.trim(),
      date: new Date().getFullYear().toString(),
    });

    setGalTitle('');
    setGalCaption('');
    setIsGalleryModalOpen(false);
  };

  // Handlers for Foundation Profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateFoundation({
      leaderName: editLeaderName,
      leaderMessage: editLeaderMessage,
      historyText: editHistory,
      visionText: editVision,
      phone: editPhone,
      email: editEmail,
    });
    setProfileSaveSuccess(true);
    setTimeout(() => setProfileSaveSuccess(false), 3000);
  };

  // Export PPDB to CSV
  const handleExportCSV = () => {
    const headers = [
      'No. Registrasi',
      'Satuan',
      'Nama Calon Siswa',
      'NISN',
      'NIK',
      'Jenis Kelamin',
      'Asal Sekolah',
      'Orang Tua',
      'Telepon',
      'Status',
      'Tanggal Daftar',
    ];
    const rows = displayedRegistrants.map((r) => [
      r.registrationNumber,
      r.targetUnit.toUpperCase(),
      `"${r.fullName}"`,
      r.nisn,
      r.nik,
      r.gender,
      `"${r.previousSchool}"`,
      `"${r.parentName}"`,
      r.parentPhone,
      r.status,
      r.registrationDate,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PPDB_Yayasan_Catur_Sakti_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Admin Navigation Bar */}
      <div className="bg-navy-950 text-white border-b border-navy-800 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-navy-950 font-bold flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="font-display font-bold text-sm text-white">
              Panel Administrator Yayasan Catur Sakti
            </div>
            <div className="text-[11px] text-amber-400 flex items-center gap-2">
              <span>{adminUser.roleLabel}</span>
              <span>·</span>
              <span className="text-slate-400">User: {adminUser.name}</span>
            </div>
          </div>
        </div>

        {/* Quick Role Switcher & Logout */}
        <div className="flex items-center gap-3">
          <select
            value={adminUser.role}
            onChange={(e) => switchAdminRole(e.target.value as AdminRole)}
            className="px-2.5 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-amber-300 focus:outline-none"
          >
            <option value="super_admin">Role: Super Admin Yayasan</option>
            <option value="admin_smp">Role: Admin SMP Catur Sakti</option>
            <option value="admin_sma">Role: Admin SMA Catur Sakti</option>
          </select>

          <button
            onClick={() => setActivePage('beranda')}
            className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-xs text-slate-300 transition-colors"
          >
            Lihat Website
          </button>

          <button
            onClick={logoutAdmin}
            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition-colors"
            title="Keluar / Logout"
            aria-label="Logout dari panel admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Admin Workspace with Sidebar */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-navy-900 text-amber-400 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Ringkasan & Statistik</span>
            </button>

            <button
              onClick={() => setActiveTab('ppdb')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'ppdb'
                  ? 'bg-navy-900 text-amber-400 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Kelola PPDB</span>
              </span>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {registrants.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'news'
                  ? 'bg-navy-900 text-amber-400 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Kelola Berita</span>
              </span>
              <span className="text-[10px] text-slate-400">{newsList.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'gallery'
                  ? 'bg-navy-900 text-amber-400 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-3">
                <ImageIcon className="w-4 h-4" />
                <span>Kelola Galeri</span>
              </span>
              <span className="text-[10px] text-slate-400">{galleryList.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-navy-900 text-amber-400 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Profil Yayasan & Satuan</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'messages'
                  ? 'bg-navy-900 text-amber-400 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>Pesan Masuk</span>
              </span>
              <span className="text-[10px] text-slate-400">{contactMessages.length}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
            <strong>Hak Akses Aktif:</strong>
            <p className="text-[11px] leading-relaxed">
              {permissions.canEditFoundation
                ? 'Super Admin: Berwenang mengelola data yayasan, profil, PPDB SMP & SMA.'
                : permissions.canManageSMP
                ? 'Admin SMP: Terfokus mengelola peserta didik dan berita unit SMP.'
                : 'Admin SMA: Terfokus mengelola peserta didik dan berita unit SMA.'}
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {/* ============================================================== */}
          {/* TAB: OVERVIEW / RINGKASAN */}
          {/* ============================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-display font-bold text-navy-900">
                    Selamat Datang, {adminUser.name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Ringkasan aktivitas operasional dan status pendaftar peserta didik baru 2026.
                  </p>
                </div>
                <button
                  onClick={handleOpenNewArticle}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-navy-900 text-amber-400 hover:bg-navy-800 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Berita Baru</span>
                </button>
              </div>

              {/* KPI Cards Strip */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <div className="text-xs text-slate-400 font-medium">Total Pendaftar PPDB</div>
                  <div className="text-3xl font-display font-extrabold text-navy-900 tabular-nums">
                    {totalRegistrants}
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1">
                    SMP: {smpRegistrants} · SMA: {smaRegistrants}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <div className="text-xs text-amber-600 font-medium">Menunggu Verifikasi</div>
                  <div className="text-3xl font-display font-extrabold text-amber-600 tabular-nums">
                    {pendingCount}
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1">Perlu ditindaklanjuti panitia</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <div className="text-xs text-emerald-600 font-medium">Siswa Diterima</div>
                  <div className="text-3xl font-display font-extrabold text-emerald-600 tabular-nums">
                    {acceptedCount}
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1">Lolos seleksi berkas/prestasi</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <div className="text-xs text-slate-400 font-medium">Total Artikel & Galeri</div>
                  <div className="text-3xl font-display font-extrabold text-navy-900 tabular-nums">
                    {newsList.length + galleryList.length}
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1">
                    {newsList.length} Berita · {galleryList.length} Foto
                  </div>
                </div>
              </div>

              {/* Recent PPDB Registrants Table Preview */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base text-navy-900">
                    Pendaftar PPDB Terbaru
                  </h3>
                  <button
                    onClick={() => setActiveTab('ppdb')}
                    className="text-xs font-semibold text-amber-600 hover:underline"
                  >
                    Buka Semua ({registrants.length})
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">No. Registrasi</th>
                        <th className="py-2.5 px-3">Nama Siswa</th>
                        <th className="py-2.5 px-3">Jenjang</th>
                        <th className="py-2.5 px-3">Asal Sekolah</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {registrants.slice(0, 5).map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-mono font-bold text-navy-900">
                            {r.registrationNumber}
                          </td>
                          <td className="py-2.5 px-3 font-medium text-slate-900">{r.fullName}</td>
                          <td className="py-2.5 px-3 uppercase text-slate-600 font-bold">
                            {r.targetUnit}
                          </td>
                          <td className="py-2.5 px-3 text-slate-500">{r.previousSchool}</td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                r.status === 'Diterima'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : r.status === 'Lolos Berkas'
                                  ? 'bg-blue-100 text-blue-800'
                                  : r.status === 'Tidak Diterima'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: KELOLA PPDB */}
          {/* ============================================================== */}
          {activeTab === 'ppdb' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-display font-bold text-navy-900">
                    Kelola Penerimaan Siswa Baru (PPDB)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Verifikasi berkas calon siswa, perbarui status kelulusan, dan unduh data ke Excel/CSV.
                  </p>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-700 hover:bg-emerald-800 text-white transition-colors flex items-center gap-2 self-start"
                >
                  <Download className="w-4 h-4" />
                  <span>Ekspor Data (CSV)</span>
                </button>
              </div>

              {/* Filters toolbar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={ppdbSearch}
                      onChange={(e) => setPpdbSearch(e.target.value)}
                      placeholder="Cari nama, nomor registrasi, NISN..."
                      className="pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs w-64 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  {adminUser.role === 'super_admin' && (
                    <select
                      value={ppdbUnitFilter}
                      onChange={(e) => setPpdbUnitFilter(e.target.value as any)}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    >
                      <option value="all">Semua Satuan (SMP & SMA)</option>
                      <option value="smp">Hanya SMP Catur Sakti</option>
                      <option value="sma">Hanya SMA Catur Sakti</option>
                    </select>
                  )}

                  <select
                    value={ppdbStatusFilter}
                    onChange={(e) => setPpdbStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  >
                    <option value="all">Semua Status</option>
                    <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                    <option value="Lolos Berkas">Lolos Berkas</option>
                    <option value="Diterima">Diterima</option>
                    <option value="Tidak Diterima">Tidak Diterima</option>
                  </select>
                </div>

                <div className="text-xs text-slate-500">
                  Menampilkan <strong>{displayedRegistrants.length}</strong> dari {registrants.length} calon siswa
                </div>
              </div>

              {/* Registrants Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">No. Registrasi</th>
                        <th className="py-3 px-4">Nama Lengkap</th>
                        <th className="py-3 px-4">Satuan</th>
                        <th className="py-3 px-4">NISN / NIK</th>
                        <th className="py-3 px-4">Orang Tua & WA</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {displayedRegistrants.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-mono font-bold text-navy-900">
                            {r.registrationNumber}
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            {r.fullName}
                            <div className="text-[10px] text-slate-400 font-normal">
                              Asal: {r.previousSchool}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-bold uppercase text-amber-700">
                            {r.targetUnit}
                            {r.smaMajorPreference && (
                              <span className="block text-[10px] text-slate-500 font-normal">
                                Jurusan: {r.smaMajorPreference}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                            {r.nisn}
                            <div className="text-[10px]">{r.nik}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-700">
                            <div>{r.parentName}</div>
                            <a
                              href={`https://wa.me/62${r.parentPhone.replace(/^0/, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-emerald-600 hover:underline font-mono"
                            >
                              WA: {r.parentPhone}
                            </a>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                r.status === 'Diterima'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : r.status === 'Lolos Berkas'
                                  ? 'bg-blue-100 text-blue-800'
                                  : r.status === 'Tidak Diterima'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {r.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setSelectedRegistrant(r)}
                                className="px-2.5 py-1 rounded-md bg-navy-900 text-amber-400 font-semibold text-[11px] hover:bg-navy-800 transition-colors"
                              >
                                Detail & Verifikasi
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal Detail / Verifikasi Status Registrant */}
              {selectedRegistrant && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-600">
                          Verifikasi Dokumen & Status
                        </span>
                        <h3 className="font-display font-bold text-lg text-navy-900">
                          {selectedRegistrant.fullName}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedRegistrant(null)}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="text-xs space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div>
                        <strong>No. Registrasi:</strong> {selectedRegistrant.registrationNumber}
                      </div>
                      <div>
                        <strong>Satuan Tujuan:</strong>{' '}
                        {selectedRegistrant.targetUnit === 'smp'
                          ? 'SMP Catur Sakti'
                          : 'SMA Catur Sakti Margatiga'}
                      </div>
                      <div>
                        <strong>TTL:</strong> {selectedRegistrant.birthPlace},{' '}
                        {selectedRegistrant.birthDate}
                      </div>
                      <div>
                        <strong>Alamat:</strong> {selectedRegistrant.address}
                      </div>
                      <div>
                        <strong>Berkas Tercentang:</strong>{' '}
                        {selectedRegistrant.documentsUploaded.join(', ')}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-slate-700">
                        Ubah Status Pendaftaran Calon Siswa:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(
                          [
                            'Menunggu Verifikasi',
                            'Lolos Berkas',
                            'Diterima',
                            'Tidak Diterima',
                          ] as PPDBStatus[]
                        ).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => {
                              updateRegistrantStatus(selectedRegistrant.id, st);
                              setSelectedRegistrant({ ...selectedRegistrant, status: st });
                            }}
                            className={`p-2.5 rounded-lg text-xs font-bold border transition-colors ${
                              selectedRegistrant.status === st
                                ? 'bg-navy-900 text-amber-400 border-navy-900'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setSelectedRegistrant(null)}
                        className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                      >
                        Selesai
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: KELOLA BERITA */}
          {/* ============================================================== */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-display font-bold text-navy-900">
                    Kelola Berita & Publikasi
                  </h2>
                  <p className="text-xs text-slate-500">
                    Publikasikan artikel, dokumentasi prestasi, berita yayasan, dan agenda kegiatan.
                  </p>
                </div>
                <button
                  onClick={handleOpenNewArticle}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-navy-900 hover:bg-navy-800 text-amber-400 transition-colors flex items-center gap-1.5 self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tulis Berita Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newsList.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-bold text-amber-600 uppercase">
                          {item.category}
                        </span>
                        <span>{item.date}</span>
                      </div>
                      <h4 className="font-display font-bold text-base text-navy-900 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{item.excerpt}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400">{item.views} pembaca</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditArticle(item)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                          title="Edit Artikel"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteNews(item.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                          title="Hapus Artikel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Edit / Tambah Berita */}
              {isNewsModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="font-display font-bold text-lg text-navy-900">
                        {editingNewsId ? 'Edit Berita' : 'Tulis Berita Baru'}
                      </h3>
                      <button
                        onClick={() => setIsNewsModalOpen(false)}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleSaveNews} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Judul Berita <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={newsFormTitle}
                          onChange={(e) => setNewsFormTitle(e.target.value)}
                          placeholder="Masukkan judul berita menarik..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Kategori Berita
                          </label>
                          <select
                            value={newsFormCategory}
                            onChange={(e) => setNewsFormCategory(e.target.value as NewsCategory)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                          >
                            <option value="Berita Yayasan">Berita Yayasan</option>
                            <option value="Kegiatan SMP">Kegiatan SMP</option>
                            <option value="Kegiatan SMA">Kegiatan SMA</option>
                            <option value="Prestasi Siswa">Prestasi Siswa</option>
                            <option value="Pengumuman">Pengumuman</option>
                            <option value="Kegiatan Pramuka">Kegiatan Pramuka</option>
                            <option value="Kegiatan Sosial dan Budaya">
                              Kegiatan Sosial dan Budaya
                            </option>
                            <option value="Informasi Pendidikan">Informasi Pendidikan</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Penulis
                          </label>
                          <input
                            type="text"
                            value={newsFormAuthor}
                            onChange={(e) => setNewsFormAuthor(e.target.value)}
                            placeholder="Contoh: Deni Sastriawan"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Foto Cover (Path / URL)
                        </label>
                        <input
                          type="text"
                          value={newsFormImage}
                          onChange={(e) => setNewsFormImage(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Ringkasan Singkat (Excerpt)
                        </label>
                        <input
                          type="text"
                          value={newsFormExcerpt}
                          onChange={(e) => setNewsFormExcerpt(e.target.value)}
                          placeholder="Ringkasan 1-2 kalimat untuk pratinjau kartu..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Konten Lengkap Berita <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          rows={6}
                          required
                          value={newsFormContent}
                          onChange={(e) => setNewsFormContent(e.target.value)}
                          placeholder="Tuliskan isi berita secara lengkap di sini..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 leading-relaxed"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setIsNewsModalOpen(false)}
                          className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider bg-navy-900 text-amber-400 hover:bg-navy-800 transition-colors shadow-md"
                        >
                          Simpan Berita
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: KELOLA GALERI */}
          {/* ============================================================== */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-display font-bold text-navy-900">
                    Kelola Galeri Foto & Dokumentasi
                  </h2>
                  <p className="text-xs text-slate-500">
                    Unggah dan kelola foto kegiatan pembelajaran, lomba, upacara, dan kepramukaan.
                  </p>
                </div>
                <button
                  onClick={() => setIsGalleryModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-navy-900 hover:bg-navy-800 text-amber-400 transition-colors flex items-center gap-1.5 self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Foto Galeri</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryList.map((g) => (
                  <div
                    key={g.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
                  >
                    <div className="relative h-44 bg-slate-900">
                      <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2">
                        <span className="text-[10px] bg-black/70 text-amber-400 px-2 py-0.5 rounded font-bold uppercase">
                          {g.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-1">
                      <h4 className="font-bold text-sm text-navy-900 leading-snug">{g.title}</h4>
                      {g.caption && (
                        <p className="text-xs text-slate-500 line-clamp-2">{g.caption}</p>
                      )}
                    </div>

                    <div className="p-4 pt-0 flex justify-end border-t border-slate-100">
                      <button
                        onClick={() => deleteGalleryItem(g.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                        title="Hapus Foto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Tambah Galeri */}
              {isGalleryModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="font-display font-bold text-lg text-navy-900">
                        Tambah Foto Dokumentasi
                      </h3>
                      <button
                        onClick={() => setIsGalleryModalOpen(false)}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleSaveGallery} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Judul Foto / Kegiatan
                        </label>
                        <input
                          type="text"
                          required
                          value={galTitle}
                          onChange={(e) => setGalTitle(e.target.value)}
                          placeholder="Contoh: Apel Jambore Ranting Margatiga"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Kategori
                        </label>
                        <select
                          value={galCategory}
                          onChange={(e) => setGalCategory(e.target.value as GalleryCategory)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-400"
                        >
                          <option value="Kegiatan Yayasan">Kegiatan Yayasan</option>
                          <option value="Kegiatan SMP">Kegiatan SMP</option>
                          <option value="Kegiatan SMA">Kegiatan SMA</option>
                          <option value="Pramuka">Pramuka</option>
                          <option value="Jambore Ranting">Jambore Ranting</option>
                          <option value="Lomba PBB">Lomba PBB</option>
                          <option value="Upacara dan Budaya">Upacara dan Budaya</option>
                          <option value="Kegiatan Pembelajaran">Kegiatan Pembelajaran</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          URL / Path Foto
                        </label>
                        <input
                          type="text"
                          required
                          value={galImage}
                          onChange={(e) => setGalImage(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Keterangan Foto (Caption)
                        </label>
                        <textarea
                          rows={2}
                          value={galCaption}
                          onChange={(e) => setGalCaption(e.target.value)}
                          placeholder="Deskripsi singkat foto..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-3">
                        <button
                          type="button"
                          onClick={() => setIsGalleryModalOpen(false)}
                          className="px-3 py-2 rounded-xl text-xs text-slate-600"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl text-xs font-bold bg-navy-900 text-amber-400 uppercase tracking-wider"
                        >
                          Simpan Foto
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: PROFIL YAYASAN & SATUAN SEKOLAH */}
          {/* ============================================================== */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-navy-900">
                  Ubah Profil Yayasan & Satuan Pendidikan
                </h2>
                <p className="text-xs text-slate-500">
                  Perbarui sejarah, visi misi, sambutan ketua yayasan, serta kontak resmi.
                </p>
              </div>

              {profileSaveSuccess && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Perubahan profil yayasan berhasil disimpan dan aktif di website.</span>
                </div>
              )}

              <form
                onSubmit={handleSaveProfile}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Pimpinan Yayasan
                    </label>
                    <input
                      type="text"
                      value={editLeaderName}
                      onChange={(e) => setEditLeaderName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor Telepon / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Resmi
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sambutan Pimpinan Yayasan
                  </label>
                  <textarea
                    rows={3}
                    value={editLeaderMessage}
                    onChange={(e) => setEditLeaderMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-400 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sejarah Yayasan Catur Sakti
                  </label>
                  <textarea
                    rows={4}
                    value={editHistory}
                    onChange={(e) => setEditHistory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-400 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Visi Pendidikan Yayasan
                  </label>
                  <textarea
                    rows={2}
                    value={editVision}
                    onChange={(e) => setEditVision(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-400 leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider bg-navy-900 text-amber-400 hover:bg-navy-800 transition-colors shadow-md"
                  >
                    Simpan Perubahan Profil
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: PESAN MASUK */}
          {/* ============================================================== */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-navy-900">
                  Pesan & Pertanyaan Masuk
                </h2>
                <p className="text-xs text-slate-500">
                  Daftar pesan dari pengunjung website, orang tua siswa, dan masyarakat.
                </p>
              </div>

              {contactMessages.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
                  Belum ada pesan masuk melalui formulir kontak.
                </div>
              ) : (
                <div className="space-y-4">
                  {contactMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="font-bold text-navy-900">{msg.fullName}</div>
                        <span className="text-slate-400">{msg.date}</span>
                      </div>
                      <div className="text-xs text-amber-700 font-semibold">{msg.subject}</div>
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl">
                        {msg.message}
                      </p>
                      <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                        <span>Email: {msg.email}</span>
                        <span>·</span>
                        <span>Telp: {msg.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
