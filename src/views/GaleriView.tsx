import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GalleryCategory, GalleryItem } from '../types';
import { Camera, Calendar, ZoomIn, Eye, Sparkles } from 'lucide-react';

const CATEGORIES: GalleryCategory[] = [
  'Semua',
  'Kegiatan Yayasan',
  'Kegiatan SMP',
  'Kegiatan SMA',
  'Pramuka',
  'Jambore Ranting',
  'Lomba PBB',
  'Upacara dan Budaya',
  'Kegiatan Pembelajaran',
  'Kegiatan Hari Besar Nasional',
];

export const GaleriView: React.FC = () => {
  const { galleryList, setSelectedGalleryImage } = useApp();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('Semua');

  const filteredItems =
    activeCategory === 'Semua'
      ? galleryList
      : galleryList.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-14 sm:py-18 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <span>Dokumentasi Visual</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Galeri Yayasan Catur Sakti
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            Arsip dokumentasi visual dinamika kegiatan belajar, prestasi, kepramukaan, dan kebersamaan
            warga besar SMP dan SMA Catur Sakti Margatiga.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Filter Tabs */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                  active
                    ? 'bg-navy-900 text-amber-400 shadow-sm font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid / Masonry Look */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedGalleryImage(item)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 group cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-navy-900/90 text-amber-400 px-2.5 py-1 rounded shadow-sm backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-1.5">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </div>
                <h3 className="font-display font-bold text-base text-navy-900 group-hover:text-amber-600 transition-colors leading-snug">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
            Belum ada dokumentasi untuk kategori ini.
          </div>
        )}
      </div>
    </div>
  );
};
