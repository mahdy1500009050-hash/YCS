import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, User, Eye, Share2, Check, ArrowRight } from 'lucide-react';

export const NewsModal: React.FC = () => {
  const { selectedNews, setSelectedNews, newsList } = useApp();
  const [copied, setCopied] = useState(false);

  if (!selectedNews) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(
      `*${selectedNews.title}*\n\nBaca informasi selengkapnya dari Yayasan Catur Sakti:\n${window.location.origin}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const relatedArticles = newsList
    .filter((a) => a.id !== selectedNews.id && (a.category === selectedNews.category || a.isFeatured))
    .slice(0, 3);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={selectedNews.title}
    >
      <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn my-8">
        {/* Close Button */}
        <button
          onClick={() => setSelectedNews(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all focus:outline-none"
          aria-label="Tutup artikel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover Photo */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={selectedNews.coverImage}
            alt={selectedNews.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                '/src/assets/images/hero_school_campus_1793635167351.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-300">
              {selectedNews.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold mt-1 text-white leading-tight">
              {selectedNews.title}
            </h2>
          </div>
        </div>

        {/* Body & Metadata */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs text-slate-500">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>{selectedNews.date}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-600" />
                <span>{selectedNews.author}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-amber-600" />
                <span>{selectedNews.views} kali dilihat</span>
              </span>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={shareToWhatsApp}
                className="px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-md text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                <span>{copied ? 'Tersalin' : 'Salin Link'}</span>
              </button>
            </div>
          </div>

          {/* Article Text Content */}
          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
            {selectedNews.content.split('\n\n').map((para, idx) => (
              <p key={idx} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="pt-6 border-t border-slate-100">
              <h4 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-3">
                Informasi Terkait Lainnya
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedArticles.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => setSelectedNews(rel)}
                    className="p-3 rounded-lg bg-slate-50 hover:bg-amber-50/50 border border-slate-200/60 hover:border-amber-300 text-left transition-colors group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] text-amber-700 font-semibold uppercase">
                        {rel.category}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 group-hover:text-amber-800 line-clamp-2 mt-1">
                        {rel.title}
                      </h5>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                      <span>Baca</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
