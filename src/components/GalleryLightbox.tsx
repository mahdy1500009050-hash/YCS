import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Tag } from 'lucide-react';

export const GalleryLightbox: React.FC = () => {
  const { selectedGalleryImage, setSelectedGalleryImage } = useApp();

  if (!selectedGalleryImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={selectedGalleryImage.title}
    >
      <div className="relative max-w-4xl w-full bg-navy-950 rounded-2xl overflow-hidden shadow-2xl border border-navy-800 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setSelectedGalleryImage(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all focus:outline-none"
          aria-label="Tutup pratinjau foto"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Media Image */}
        <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
          <img
            src={selectedGalleryImage.imageUrl}
            alt={selectedGalleryImage.title}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>

        {/* Caption & Metadata */}
        <div className="p-5 sm:p-6 bg-navy-900 border-t border-navy-800 text-white">
          <div className="flex flex-wrap items-center gap-3 text-xs text-amber-400 font-medium mb-1.5">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              <span>{selectedGalleryImage.category}</span>
            </span>
            <span className="text-navy-700">·</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{selectedGalleryImage.date}</span>
            </span>
          </div>

          <h3 className="text-lg font-bold font-display text-white">{selectedGalleryImage.title}</h3>
          {selectedGalleryImage.caption && (
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              {selectedGalleryImage.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
