import { FoundationProfile, SchoolUnitInfo, NewsArticle, GalleryItem, PPDBRegistrant } from '../types';

export const INITIAL_FOUNDATION: FoundationProfile = {
  name: 'YAYASAN CATUR SAKTI',
  tagline: 'Membangun Generasi Cerdas, Berkarakter, dan Berprestasi',
  address: 'Jl. Trans Polri Jaya Guna 1, Desa Sukaraja Tiga, Kecamatan Margatiga',
  subdistrict: 'Margatiga',
  district: 'Lampung Timur',
  province: 'Lampung',
  postalCode: '34386',
  phone: '082235174743',
  email: 'yayasansmacs@gmail.com',
  instagram: 'https://www.instagram.com/yayasancatursakti/',
  leaderName: 'Dijah Diana, S.Pd.',
  leaderTitle: 'Ketua Pimpinan Yayasan',
  leaderPhoto: '/src/assets/images/foundation_head_1793635169251.jpg',
  leaderMessage:
    'Pendidikan bukan sekadar transfer ilmu pengetahuan, melainkan proses menumbuhkan budi pekerti luhur, kemandirian, dan ketangguhan moral generasi muda. Sejak tahun 1975, Yayasan Catur Sakti hadir di bumi Margatiga, Lampung Timur untuk memberikan ruang belajar yang inklusif, berkualitas, dan relevan dengan perkembangan zaman bagi putra-putri bangsa.',
  operatorName: 'Deni Sastriawan',
  operatorTitle: 'Operator Yayasan',
  bannerPhoto: '/src/assets/images/hero_school_campus_1793635167351.jpg',
  historyText:
    'Yayasan Catur Sakti didirikan berawal dari dedikasi para tokoh pendidik di Margatiga, Lampung Timur, dengan unit pendidikan pertama SMP Catur Sakti yang resmi berdiri sejak tahun 1975. Seiring perkembangan kebutuhan masyarakat akan jenjang pendidikan lanjutan yang bermutu, didirikanlah SMA Catur Sakti Margatiga. Selama lebih dari empat dekade, Yayasan Catur Sakti terus berinovasi dalam sarana prasarana, peningkatan mutu guru, dan pembentukan karakter peserta didik hingga berhasil mencetak ribuan alumni yang sukses di perguruan tinggi, dunia kerja, dan kepemimpinan masyarakat.',
  visionText:
    'Menjadi lembaga pendidikan unggulan di Lampung Timur yang melahirkan insan bertakwa, berintelektual tinggi, berkarakter mulia, serta siap bersaing di tingkat nasional maupun global.',
  missionList: [
    'Menyelenggarakan proses pembelajaran yang aktif, inovatif, kreatif, efektif, dan menyenangkan berlandaskan Kurikulum Nasional.',
    'Menanamkan nilai-nilai keimanan, ketakwaan, budi pekerti luhur, dan disiplin tinggi melalui pembiasaan sehari-hari.',
    'Mengembangkan bakat, minat, dan potensi peserta didik melalui kegiatan akademik dan ekstrakurikuler kepemimpinan seperti Pramuka, Seni, dan Olahraga.',
    'Meningkatkan kompetensi tenaga pendidik dan kependidikan secara berkelanjutan serta mengoptimalkan sarana teknologi informasi.',
    'Menjalin kemitraan sinergis dengan orang tua siswa, alumni, masyarakat, dunia usaha, dan instansi pemerintah.',
  ],
  educationGoals: [
    'Mewujudkan lulusan SMP dan SMA yang memiliki kompetensi akademik unggul dan berakhlakul karimah.',
    'Meningkatkan persentase kelulusan siswa SMA Catur Sakti yang diterima di Perguruan Tinggi Negeri (PTN) dan kedinasan.',
    'Membekali peserta didik dengan kecakapan literasi digital, wirausaha dasar, dan kemandirian hidup.',
    'Mempertahankan dan meningkatkan akreditasi sekolah dengan standar mutu sarana prasarana terbaik di kawasan Margatiga.',
  ],
};

export const INITIAL_SCHOOL_UNITS: Record<'smp' | 'sma', SchoolUnitInfo> = {
  smp: {
    id: 'smp',
    name: 'SMP Catur Sakti',
    fullName: 'Sekolah Menengah Pertama Catur Sakti Margatiga',
    level: 'Sekolah Menengah Pertama (SMP)',
    npsn: '10806049',
    establishedYear: 1975,
    accreditation: 'B',
    phone: '082235174743',
    email: 'yayasansmacs@gmail.com',
    description:
      'SMP Catur Sakti berdiri sejak tahun 1975 sebagai tonggak awal pengabdian Yayasan Catur Sakti di Margatiga. Dengan akreditasi B dan penerapan Kurikulum Merdeka, SMP Catur Sakti membimbing peserta didik usia transisi untuk memiliki pondasi ilmu pengetahuan yang kokoh, kecerdasan emosional, serta kepribadian yang tangguh.',
    curriculum: 'Kurikulum Merdeka dengan Penguatan Profil Pelajar Pancasila',
    heroImage: '/src/assets/images/smp_catur_sakti_1793635168434.jpg',
    facilities: [
      { name: 'Laboratorium Komputer & TIK', description: 'Dilengkapi jaringan internet cepat untuk ANBK dan pembelajaran digital.', icon: 'Monitor' },
      { name: 'Perpustakaan Sekolah', description: 'Koleksi buku kurikulum, referensi, fiksi, dan area baca interaktif.', icon: 'BookOpen' },
      { name: 'Lapangan Olahraga Multifungsi', description: 'Fasilitas bola voli, basket, futsal, dan upacara bendera.', icon: 'Trophy' },
      { name: 'Ruang Kelas Nyaman', description: 'Ventilasi optimal, proyektor LCD, serta sarana belajar ergonomis.', icon: 'Building' },
      { name: 'Unit Kesehatan Sekolah (UKS)', description: 'Pelayanan pertolongan pertama didukung tenaga pembina kesehatan.', icon: 'HeartPulse' },
      { name: 'Musholla & Ruang Keagamaan', description: 'Tempat ibadah sholat dhuha dan dhuhur berjamaah serta pembinaan rohani.', icon: 'Sparkles' },
    ],
    programs: [
      { title: 'Pembinaan Karakter & Keagamaan', description: 'Program tadarus pagi, sholat dhuha berjamaah, dan kajian nilai moralitas.' },
      { title: 'Literasi Digital & Numerasi', description: 'Pengenalan komputasi dasar dan penalaran analitis sejak dini.' },
      { title: 'Gerakan Sekolah Sehat & Adiwiyata', description: 'Pendidikan lingkungan hidup dan kebersihan di lingkungan sekolah.' },
    ],
    extracurriculars: [
      { name: 'Pramuka Penggalang (Gudep Margatiga)', category: 'Kepanduan', description: 'Wajib kepanduan untuk pembentukan disiplin, survival, dan kepemimpinan.' },
      { name: 'Palang Merah Remaja (PMR)', category: 'Kemanusiaan', description: 'Pelatihan pertolongan pertama, donor darah, dan bakti sosial desa.' },
      { name: 'Bola Voli & Futsal', category: 'Olahraga', description: 'Latihan rutin pembinaan atlet pelajar tingkat kecamatan dan kabupaten.' },
      { name: 'Seni Tari & Musik Tradisional Lampung', category: 'Seni Budaya', description: 'Pelestarian khazanah seni budaya daerah Lampung dan nusantara.' },
    ],
    achievements: [
      { title: 'Juara 2 Lomba LKBB Tingkat Kwarran Margatiga', year: '2025', organizer: 'Kwartir Ranting Margatiga', rank: 'Juara 2' },
      { title: 'Peserta Berprestasi Jambore Cabang Pramuka Lampung Timur', year: '2024', organizer: 'Kwarcab Lampung Timur', rank: 'Apresiasi' },
      { title: 'Juara Harapan 1 Turnamen Bola Voli Antar SMP', year: '2024', organizer: 'Dispora Lampung Timur', rank: 'Harapan 1' },
    ],
  },
  sma: {
    id: 'sma',
    name: 'SMA Catur Sakti Margatiga',
    fullName: 'Sekolah Menengah Atas Catur Sakti Margatiga',
    level: 'Sekolah Menengah Atas (SMA)',
    npsn: '10806032',
    establishedYear: 1988,
    accreditation: 'B',
    phone: '082235174743',
    email: 'yayasansmacs@gmail.com',
    description:
      'SMA Catur Sakti Margatiga merupakan jenjang pendidikan menengah atas terpercaya di Margatiga, Lampung Timur. Terakreditasi B, sekolah ini mempersiapkan siswa melanjutkan ke jenjang perguruan tinggi negeri/swasta maupun mandiri di dunia kerja melalui integrasi kurikulum akademik dan pelatihan keterampilan praktis.',
    curriculum: 'Kurikulum Merdeka dengan Peminatan Akademik Fleksibel & Keterampilan Vokasi',
    heroImage: '/src/assets/images/sma_catur_sakti_1793635168523.jpg',
    facilities: [
      { name: 'Laboratorium IPA Terpadu (Fisika, Kimia, Biologi)', description: 'Peralatan praktikum lengkap untuk eksperimen sains dan riset siswa.', icon: 'FlaskConical' },
      { name: 'Laboratorium Komputer & Multimedia', description: 'Perangkat PC modern untuk ujian berbasis komputer dan grafis dasar.', icon: 'Monitor' },
      { name: 'Perpustakaan Akademik', description: 'Koleksi buku mata pelajaran, ensiklopedia ilmiah, dan bank soal UTBK.', icon: 'BookOpen' },
      { name: 'Gedung Serbaguna & Aula', description: 'Ruang representatif untuk seminar, wisuda kelulusan, dan lokakarya.', icon: 'Building' },
      { name: 'Lapangan Olahraga Standar', description: 'Sarana kompetisi voli, bola basket, futsal, dan atletik.', icon: 'Trophy' },
      { name: 'Ruang Konseling & Karir (BK)', description: 'Bimbingan psikologis, konsultasi minat-bakat, dan persiapan PTN.', icon: 'Compass' },
    ],
    programs: [
      { title: 'Program Bimbingan Sukses Masuk PTN & Kedinasan', description: 'Pendalaman materi UTBK-SNBT, try out berkala, dan bedah kampus.' },
      { title: 'Pengembangan Keterampilan Digital & TIK', description: 'Pelatihan aplikasi perkantoran, desain grafis, dan literasi media.' },
      { title: 'Kewirausahaan Pelajar (P5)', description: 'Praktek merintis usaha kreatif berbasis potensi lokal Lampung Timur.' },
    ],
    extracurriculars: [
      { name: 'Pramuka Penegak (Gudep SMA)', category: 'Kepanduan', description: 'Pendidikan kepanduan penegak, pengembaraan, dan kemah bakti.' },
      { name: 'Paskibra Sekolah', category: 'Kepemimpinan', description: 'Korps pengibar bendera, pelatihan PBB formasi, dan kedisiplinan.' },
      { name: 'Klub Olahraga Prestasi (Voli & Atletik)', category: 'Olahraga', description: 'Pembinaan intensif menuju ajang O2SN dan Popda kabupaten.' },
      { name: 'Rohis & Bimbingan Ibadah', category: 'Keagamaan', description: 'Kajian remaja, pembinaan imam sholat, dan peringatan hari besar Islam.' },
      { name: 'Seni Musik Akustik & Teater Pelajar', category: 'Kesenian', description: 'Wadah kreasi seni musik, pertunjukan drama, dan vokal.' },
    ],
    achievements: [
      { title: 'Juara 1 Lomba PBB Indah Tingkat Kabupaten', year: '2025', organizer: 'PPI Lampung Timur', rank: 'Juara 1' },
      { title: 'Kontingen Terbaik Jambore Ranting Margatiga', year: '2024', organizer: 'Kwarran Margatiga', rank: 'Terbaik' },
      { title: 'Finalis Olimpiade Sains Kabupaten (OSK) Bidang Kimia', year: '2024', organizer: 'Kemendikbudristek', rank: 'Finalis' },
      { title: 'Juara 3 Turnamen Voli Pelajar Se-Kecamatan Margatiga', year: '2025', organizer: 'Kecamatan Margatiga', rank: 'Juara 3' },
    ],
  },
};

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Penerimaan Peserta Didik Baru (PPDB) SMP dan SMA Catur Sakti Tahun Ajaran 2026/2027 Resmi Dibuka',
    slug: 'ppdb-catur-sakti-2026-resmi-dibuka',
    category: 'Pengumuman',
    excerpt:
      'Yayasan Catur Sakti mengundang calon peserta didik baru untuk bergabung di SMP Catur Sakti dan SMA Catur Sakti Margatiga dengan beasiswa dan kemudahan pendaftaran.',
    content: `Yayasan Catur Sakti Margatiga dengan bangga mengumumkan bahwa pendaftaran Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 telah dibuka secara serentak untuk jenjang SMP Catur Sakti (NPSN: 10806049) dan SMA Catur Sakti Margatiga (NPSN: 10806032).

Pendaftaran dapat dilakukan secara online melalui website resmi ini maupun langsung mendatangi sekretariat panitia di kampus Jl. Trans Polri Jaya Guna 1, Desa Sukaraja Tiga, Margatiga.

Yayasan menyediakan berbagai kemudahan, termasuk beasiswa bagi siswa berprestasi di bidang akademik, olahraga, seni, serta keringanan biaya bagi siswa dari keluarga prasejahtera. Calon pendaftar disarankan menyiapkan berkas dasar seperti fotokopi Kartu Keluarga, Akta Kelahiran, dan Surat Keterangan Lulus (SKL) dari sekolah asal.`,
    author: 'Deni Sastriawan (Operator)',
    date: '28 Februari 2026',
    readTime: '3 menit',
    coverImage: '/src/assets/images/hero_school_campus_1793635167351.jpg',
    views: 342,
    isFeatured: true,
  },
  {
    id: 'news-2',
    title: 'Kontingen Pramuka Catur Sakti Raih Prestasi Gemilang dalam Jambore Ranting Margatiga',
    slug: 'prestasi-pramuka-jambore-ranting-margatiga',
    category: 'Kegiatan Pramuka',
    excerpt:
      'Pangkalan SMP dan SMA Catur Sakti menunjukkan dedikasi, kedisiplinan, dan kekompakan tinggi pada Jambore Ranting Pramuka yang diselenggarakan di Lampung Timur.',
    content: `Gerakan Pramuka Gugus Depan Yayasan Catur Sakti kembali menorehkan prestasi membanggakan pada ajang perkemahan Jambore Ranting yang berlangsung di Margatiga, Lampung Timur. 

Dalam kegiatan yang diikuti puluhan gugus depan se-kecamatan Margatiga ini, kontingen Pramuka Catur Sakti memborong predikat Kontingen Terdisiplin dan meraih Juara dalam lomba pionering serta pertolongan pertama (P3K).

Ketua Pimpinan Yayasan, Ibu Dijah Diana, S.Pd., menyampaikan apresiasi tinggi atas capaian adik-adik pramuka dan para pembina. Beliau menekankan bahwa kepanduan adalah wahana pembentukan karakter pemimpin yang tangguh, setia kawan, dan cinta tanah air.`,
    author: 'Pembina Pramuka',
    date: '15 Februari 2026',
    readTime: '4 menit',
    coverImage: '/src/assets/images/pramuka_activity_1793635169538.jpg',
    views: 285,
    isFeatured: true,
  },
  {
    id: 'news-3',
    title: 'Tim Paskibra SMA Catur Sakti Margatiga Sabet Trofi Juara Lomba Peraturan Baris Berbaris (PBB)',
    slug: 'paskibra-sma-catur-sakti-juara-pbb',
    category: 'Prestasi Siswa',
    excerpt:
      'Ketepatan formasi, kerapian langkah, dan wibawa komandan peleton mengantarkan peleton SMA Catur Sakti menjuarai ajang kompetisi PBB antar sekolah.',
    content: `Regu Paskibra SMA Catur Sakti Margatiga berhasil meraih Juara 1 pada Lomba Ketangkasan Baris Berbaris (LKBB) Formasi Pelajar se-Kabupaten Lampung Timur.

Penampilan yang memukau dengan variasi formasi modern dan ketegasan aba-aba memikat dewan juri yang terdiri dari unsur Purna Paskibraka Indonesia (PPI) dan Koramil setempat.

Prestasi ini menjadi bukti nyata komitmen SMA Catur Sakti dalam membina ekstrakurikuler kepemimpinan dan kedisiplinan yang berkelanjutan.`,
    author: 'Kesiswaan SMA',
    date: '20 Januari 2026',
    readTime: '3 menit',
    coverImage: '/src/assets/images/sma_catur_sakti_1793635168523.jpg',
    views: 412,
    isFeatured: false,
  },
  {
    id: 'news-4',
    title: 'Penerapan Pembelajaran Berbasis Proyek (PjBL) di SMP Catur Sakti Tingkatkan Kreativitas Siswa',
    slug: 'pembelajaran-berbasis-proyek-smp-catur-sakti',
    category: 'Kegiatan SMP',
    excerpt:
      'Siswa-siswi SMP Catur Sakti antusias mengeksplorasi materi sains dan literasi kontekstual melalui pameran karya mini di ruang kelas.',
    content: `Sebagai bagian dari implementasi Kurikulum Merdeka, siswa kelas VII dan VIII SMP Catur Sakti menyelenggarakan pameran karya ilmiah mini dan daur ulang ramah lingkungan.

Dalam kegiatan ini, peserta didik bekerja sama dalam kelompok membedah persoalan lingkungan sekitar Sukaraja Tiga, seperti pengelolaan sampah pekarangan dan pelestarian tanaman obat keluarga. Para guru bertindak sebagai fasilitator yang memandu diskusi dan penyusunan laporan mini.`,
    author: 'Tim Kurikulum SMP',
    date: '10 Januari 2026',
    readTime: '2 menit',
    coverImage: '/src/assets/images/smp_catur_sakti_1793635168434.jpg',
    views: 198,
    isFeatured: false,
  },
  {
    id: 'news-5',
    title: 'Sosialisasi Bimbingan Masuk Perguruan Tinggi Negeri (PTN) bagi Siswa Kelas XII SMA Catur Sakti',
    slug: 'sosialisasi-ptn-sma-catur-sakti',
    category: 'Informasi Pendidikan',
    excerpt:
      'Menyambut seleksi masuk PTN jalur SNBP dan SNBT, guru BK memberikan pembekalan mendalam terkait pemilihan jurusan dan analisis peluang kelulusan.',
    content: `Guru Bimbingan Konseling (BK) bersama manajemen SMA Catur Sakti Margatiga menggelar sosialisasi jalur masuk perguruan tinggi bagi seluruh siswa kelas XII beserta orang tua/wali.

Sekolah memaparkan strategi pemilihan program studi di universitas negeri di Lampung (seperti Universitas Lampung dan Itera) serta kampus di pulau Jawa dan Sumatra. Setiap siswa memperoleh pendampingan langsung berdasarkan minat, bakat, dan rekapitulasi nilai rapor.`,
    author: 'Bimbingan Konseling SMA',
    date: '22 Desember 2025',
    readTime: '3 menit',
    coverImage: '/src/assets/images/sma_catur_sakti_1793635168523.jpg',
    views: 310,
    isFeatured: false,
  },
  {
    id: 'news-6',
    title: 'Upacara Bendera dan Silaturahmi Akbar Keluarga Besar Yayasan Catur Sakti Sukaraja Tiga',
    slug: 'upacara-silaturahmi-akbar-yayasan',
    category: 'Berita Yayasan',
    excerpt:
      'Pendidik, tenaga kependidikan, pengurus yayasan, dan siswa SMP-SMA berkumpul bersama mempererat kebersamaan dan meneguhkan visi pendidikan.',
    content: `Seluruh jajaran pimpinan dan keluarga besar Yayasan Catur Sakti Margatiga mengikuti upacara gabungan di lapangan utama sekolah. Dalam amanatnya, Ketua Pimpinan Yayasan Dijah Diana, S.Pd. mengajak seluruh warga sekolah untuk terus menjaga marwah lembaga, bergotong-royong, dan mengutamakan pelayanan terbaik bagi peserta didik.`,
    author: 'Sekretariat Yayasan',
    date: '17 Desember 2025',
    readTime: '2 menit',
    coverImage: '/src/assets/images/foundation_head_1793635169251.jpg',
    views: 245,
    isFeatured: false,
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Gedung dan Halaman Kampus Yayasan Catur Sakti',
    category: 'Kegiatan Yayasan',
    imageUrl: '/src/assets/images/hero_school_campus_1793635167351.jpg',
    date: '2026',
    caption: 'Suasana lingkungan sekolah yang hijau, asri, dan representatif di Margatiga, Lampung Timur.',
  },
  {
    id: 'gal-2',
    title: 'Aktivitas Belajar Kolaboratif Siswa SMP Catur Sakti',
    category: 'Kegiatan SMP',
    imageUrl: '/src/assets/images/smp_catur_sakti_1793635168434.jpg',
    date: '2026',
    caption: 'Interaksi aktif antara pendidik dan siswa dalam pembelajaran berbasis diskusi di kelas.',
  },
  {
    id: 'gal-3',
    title: 'Praktikum Sains di Laboratorium IPA SMA Catur Sakti',
    category: 'Kegiatan SMA',
    imageUrl: '/src/assets/images/sma_catur_sakti_1793635168523.jpg',
    date: '2026',
    caption: 'Siswa-siswi SMA mengamati reaksi larutan kimia dengan bimbingan guru sains.',
  },
  {
    id: 'gal-4',
    title: 'Upacara Pengibaran Bendera Jambore Pramuka Margatiga',
    category: 'Pramuka',
    imageUrl: '/src/assets/images/pramuka_activity_1793635169538.jpg',
    date: '2026',
    caption: 'Barisan Pramuka Catur Sakti mengikuti upacara apel besar dengan khidmat di bumi perkemahan.',
  },
  {
    id: 'gal-5',
    title: 'Lomba Ketangkasan Baris Berbaris (LKBB)',
    category: 'Lomba PBB',
    imageUrl: '/src/assets/images/sma_catur_sakti_1793635168523.jpg',
    date: '2025',
    caption: 'Kesiapan dan kekompakan tim baris-berbaris siswa membawa pulang trofi kebanggaan.',
  },
  {
    id: 'gal-6',
    title: 'Pembinaan Pendidik Bersama Pimpinan Yayasan',
    category: 'Kegiatan Yayasan',
    imageUrl: '/src/assets/images/foundation_head_1793635169251.jpg',
    date: '2026',
    caption: 'Rapat koordinasi dan penguatan kompetensi guru SMP dan SMA Catur Sakti.',
  },
];

export const INITIAL_REGISTRANTS: PPDBRegistrant[] = [
  {
    id: 'reg-001',
    registrationNumber: 'REG-2026-SMP-001',
    targetUnit: 'smp',
    fullName: 'Muhammad Rizky Pratama',
    nisn: '0112458921',
    nik: '1807051204110001',
    gender: 'Laki-laki',
    birthPlace: 'Margatiga',
    birthDate: '2013-04-12',
    religion: 'Islam',
    address: 'Desa Sukaraja Tiga RT 04 RW 02, Kec. Margatiga, Lampung Timur',
    parentName: 'Bambang Supriyanto',
    parentPhone: '082188443322',
    parentJob: 'Petani / Wiraswasta',
    previousSchool: 'SD Negeri 1 Sukaraja Tiga',
    registrationDate: '2026-02-15',
    status: 'Lolos Berkas',
    statusNotes: 'Berkas lengkap, menunggu jadwal orientasi siswa baru.',
    documentsUploaded: ['Kartu Keluarga', 'Akta Kelahiran', 'Ijazah / Surat Keterangan'],
  },
  {
    id: 'reg-002',
    registrationNumber: 'REG-2026-SMA-001',
    targetUnit: 'sma',
    fullName: 'Anindya Putri Maharani',
    nisn: '0085432190',
    nik: '1807055508080002',
    gender: 'Perempuan',
    birthPlace: 'Metro',
    birthDate: '2010-08-25',
    religion: 'Islam',
    address: 'Jl. Raya Jaya Guna, Desa Sukaraja Tiga, Margatiga',
    parentName: 'Hendro Gunawan',
    parentPhone: '081277665544',
    parentJob: 'Pegawai Swasta',
    previousSchool: 'SMP Catur Sakti',
    smaMajorPreference: 'MIPA',
    registrationDate: '2026-02-18',
    status: 'Diterima',
    statusNotes: 'Diterima jalur prestasi akademik peringkat 1.',
    documentsUploaded: ['Kartu Keluarga', 'Akta Kelahiran', 'Rapor Semester 1-5', 'Sertifikat Prestasi'],
  },
  {
    id: 'reg-003',
    registrationNumber: 'REG-2026-SMA-002',
    targetUnit: 'sma',
    fullName: 'Dimas Setiawan',
    nisn: '0076543210',
    nik: '1807051909070003',
    gender: 'Laki-laki',
    birthPlace: 'Sekampung',
    birthDate: '2010-09-19',
    religion: 'Islam',
    address: 'Desa Gedung Wani, Margatiga, Lampung Timur',
    parentName: 'Suryanto',
    parentPhone: '085299887711',
    parentJob: 'PNS / Guru',
    previousSchool: 'SMP Negeri 1 Margatiga',
    smaMajorPreference: 'IPS',
    registrationDate: '2026-02-20',
    status: 'Menunggu Verifikasi',
    statusNotes: 'Dokumen sedang diteliti oleh panitia PPDB SMA.',
    documentsUploaded: ['Kartu Keluarga', 'Akta Kelahiran'],
  },
];
