import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NewsModal } from './components/NewsModal';
import { GalleryLightbox } from './components/GalleryLightbox';
import { HomeView } from './views/HomeView';
import { ProfilView } from './views/ProfilView';
import { SMPView } from './views/SMPView';
import { SMAView } from './views/SMAView';
import { BeritaView } from './views/BeritaView';
import { GaleriView } from './views/GaleriView';
import { PPDBView } from './views/PPDBView';
import { KontakView } from './views/KontakView';
import { AdminView } from './views/AdminView';

const MainContent: React.FC = () => {
  const { activePage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Universal Institutional Topbar & Navigation */}
      {activePage !== 'admin' && <Navbar />}

      {/* Dynamic View Container */}
      <main className="flex-1">
        {activePage === 'beranda' && <HomeView />}
        {activePage === 'profil' && <ProfilView />}
        {activePage === 'smp' && <SMPView />}
        {activePage === 'sma' && <SMAView />}
        {activePage === 'berita' && <BeritaView />}
        {activePage === 'galeri' && <GaleriView />}
        {activePage === 'ppdb' && <PPDBView />}
        {activePage === 'kontak' && <KontakView />}
        {activePage === 'admin' && <AdminView />}
      </main>

      {/* Universal Footer for all public views */}
      {activePage !== 'admin' && <Footer />}

      {/* Floating Modals */}
      <NewsModal />
      <GalleryLightbox />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
