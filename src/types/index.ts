export type SchoolUnitType = 'smp' | 'sma';

export interface FoundationProfile {
  name: string;
  tagline: string;
  address: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  instagram: string;
  leaderName: string;
  leaderTitle: string;
  leaderMessage: string;
  leaderPhoto: string;
  operatorName: string;
  operatorTitle: string;
  bannerPhoto: string;
  historyText: string;
  visionText: string;
  missionList: string[];
  educationGoals: string[];
}

export interface SchoolUnitInfo {
  id: SchoolUnitType;
  name: string;
  fullName: string;
  level: string;
  npsn: string;
  establishedYear: number;
  accreditation: string;
  phone: string;
  email: string;
  description: string;
  curriculum: string;
  facilities: { name: string; description: string; icon: string }[];
  programs: { title: string; description: string }[];
  extracurriculars: { name: string; category: string; description: string }[];
  achievements: { title: string; year: string; organizer: string; rank: string }[];
  heroImage: string;
}

export type NewsCategory =
  | 'Semua'
  | 'Berita Yayasan'
  | 'Kegiatan SMP'
  | 'Kegiatan SMA'
  | 'Prestasi Siswa'
  | 'Pengumuman'
  | 'Kegiatan Pramuka'
  | 'Kegiatan Sosial dan Budaya'
  | 'Informasi Pendidikan';

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: NewsCategory;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  views: number;
  isFeatured?: boolean;
}

export type GalleryCategory =
  | 'Semua'
  | 'Kegiatan Yayasan'
  | 'Kegiatan SMP'
  | 'Kegiatan SMA'
  | 'Pramuka'
  | 'Jambore Ranting'
  | 'Lomba PBB'
  | 'Upacara dan Budaya'
  | 'Kegiatan Pembelajaran'
  | 'Kegiatan Hari Besar Nasional';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  date: string;
  caption: string;
}

export type PPDBStatus = 'Menunggu Verifikasi' | 'Lolos Berkas' | 'Diterima' | 'Tidak Diterima';

export interface PPDBRegistrant {
  id: string;
  registrationNumber: string;
  targetUnit: SchoolUnitType;
  fullName: string;
  nisn: string;
  nik: string;
  gender: 'Laki-laki' | 'Perempuan';
  birthPlace: string;
  birthDate: string;
  religion: string;
  address: string;
  parentName: string;
  parentPhone: string;
  parentJob: string;
  previousSchool: string;
  smaMajorPreference?: 'MIPA' | 'IPS' | 'Belum Ditentukan';
  registrationDate: string;
  status: PPDBStatus;
  statusNotes?: string;
  documentsUploaded: string[];
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export type AdminRole = 'super_admin' | 'admin_smp' | 'admin_sma';

export interface AdminUser {
  username: string;
  name: string;
  role: AdminRole;
  roleLabel: string;
}
