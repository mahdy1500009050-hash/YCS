import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NewsCategory, NewsArticle } from '../types';
import { filterNews } from '../utils/ppdb';
import { Search, Calendar, User, Eye, ArrowRight, Share2, Sparkles } from 'lucide-react';

const CATEGORIES: NewsCategory[] = [
  'Semua',
  'Berita Yayasan',
  'Kegiatan SMP',
  'Kegiatan SMA',
  'Prestasi Siswa',
  'Pengumuman',
  'Kegiatan Pramuka',
  'Kegiatan Sosial dan Budaya',
  'Informasi Pendidikan',
];

export const BeritaView: React.FC = () => {
  const { newsList, setSelectedNews } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = filterNews(newsList, searchQuery, selectedCategory);
  const featured = newsList.find((n) => n.isFeatured) || newsList[0];
  const popularNews = [...newsList].sort((a, b) => b.views - a.views).slice(0, 4);

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-14 sm:py-18 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <span>Portal Informasi Resmi</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Berita & Informasi Yayasan Catur Sakti
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            Pusat publikasi berita terkini seputar kegiatan akademik, prestasi siswa, warta kepramukaan,
            dan pengumuman resmi yayasan.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/80 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berita, prestasi siswa, pengumuman, atau kegiatan..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm placeholder-slate-400"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                    active
                      ? 'bg-navy-900 text-amber-400 shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Headline Hero (if no search filter active) */}
        {!searchQuery && selectedCategory === 'Semua' && featured && (
          <div
            onClick={() => setSelectedNews(featured)}
            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl transition-all cursor-pointer group grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-full min-h-[300px] bg-slate-900 overflow-hidden">
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-400 text-navy-950 shadow-md">
                  Sorotan Utama
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-amber-600 font-bold uppercase">{featured.category}</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-display font-bold text-navy-900 group-hover:text-amber-600 transition-colors leading-snug">
                  {featured.title}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">
                  {featured.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Penulis: {featured.author}</span>
                <span className="text-amber-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Baca Artikel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 2-Column Split: News Grid (8 cols) + Popular Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main News List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl text-navy-900">
                {selectedCategory === 'Semua' ? 'Semua Berita Terbit' : `Kategori: ${selectedCategory}`}
              </h3>
              <span className="text-xs text-slate-400">
                {filtered.length} artikel ditemukan
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center space-y-3 border border-slate-200">
                <p className="text-slate-500 text-sm">
                  Tidak ada berita yang sesuai dengan kata kunci atau kategori yang dipilih.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Semua');
                  }}
                  className="px-4 py-2 rounded-lg bg-navy-900 text-amber-400 text-xs font-semibold"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filtered.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => setSelectedNews(article)}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-200/80 overflow-hidden flex flex-col justify-between cursor-pointer group transition-all"
                  >
                    <div>
                      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/95 text-navy-900 px-2.5 py-1 rounded shadow-sm">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{article.date}</span>
                          <span>·</span>
                          <span>{article.readTime}</span>
                        </div>

                        <h4 className="font-display font-bold text-base text-navy-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h4>

                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 mt-2">
                      <span>{article.author}</span>
                      <span className="text-amber-600 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Baca</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar: Popular & Categories */}
          <div className="lg:col-span-4 space-y-6">
            {/* Berita Populer */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h4 className="font-display font-bold text-base text-navy-900">
                  Berita Banyak Dibaca
                </h4>
              </div>

              <div className="space-y-3 divide-y divide-slate-100">
                {popularNews.map((pop, idx) => (
                  <div
                    key={pop.id}
                    onClick={() => setSelectedNews(pop)}
                    className="pt-3 first:pt-0 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-display font-extrabold text-base text-slate-300 group-hover:text-amber-500 tabular-nums shrink-0">
                        0{idx + 1}
                      </span>
                      <div>
                        <span className="text-[10px] text-amber-600 font-bold uppercase">
                          {pop.category}
                        </span>
                        <h5 className="text-xs font-bold text-navy-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug mt-0.5">
                          {pop.title}
                        </h5>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                          <span>{pop.date}</span>
                          <span>·</span>
                          <span>{pop.views} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hubungi Humas / Redaksi */}
            <div className="bg-navy-900 text-white rounded-2xl p-6 space-y-3">
              <h4 className="font-display font-bold text-base text-white">
                Punya Informasi atau Liputan?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Warga sekolah, alumni, atau masyarakat dapat mengirimkan informasi kegiatan melalui operator yayasan.
              </p>
              <div className="pt-2">
                <a
                  href="mailto:yayasansmacs@gmail.com"
                  className="inline-block px-4 py-2 rounded-lg bg-amber-400 text-navy-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors"
                >
                  Kirim Berita (Email)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
