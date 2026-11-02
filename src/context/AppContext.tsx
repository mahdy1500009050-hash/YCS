import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FoundationProfile,
  SchoolUnitInfo,
  NewsArticle,
  GalleryItem,
  PPDBRegistrant,
  ContactMessage,
  AdminUser,
  AdminRole,
  SchoolUnitType,
  PPDBStatus,
} from '../types';
import {
  INITIAL_FOUNDATION,
  INITIAL_SCHOOL_UNITS,
  INITIAL_NEWS,
  INITIAL_GALLERY,
  INITIAL_REGISTRANTS,
} from '../data/initialData';
import { generateRegistrationNumber } from '../utils/ppdb';

export type ActivePage =
  | 'beranda'
  | 'profil'
  | 'smp'
  | 'sma'
  | 'berita'
  | 'galeri'
  | 'ppdb'
  | 'kontak'
  | 'admin';

interface AppContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedNews: NewsArticle | null;
  setSelectedNews: (news: NewsArticle | null) => void;
  selectedGalleryImage: GalleryItem | null;
  setSelectedGalleryImage: (item: GalleryItem | null) => void;

  // Data states
  foundation: FoundationProfile;
  updateFoundation: (updated: Partial<FoundationProfile>) => void;
  schoolUnits: Record<'smp' | 'sma', SchoolUnitInfo>;
  updateSchoolUnit: (id: 'smp' | 'sma', updated: Partial<SchoolUnitInfo>) => void;

  newsList: NewsArticle[];
  addNews: (news: Omit<NewsArticle, 'id' | 'views'>) => void;
  updateNews: (id: string, updated: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;

  galleryList: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  registrants: PPDBRegistrant[];
  addRegistrant: (
    data: Omit<PPDBRegistrant, 'id' | 'registrationNumber' | 'registrationDate' | 'status'>
  ) => PPDBRegistrant;
  updateRegistrantStatus: (id: string, status: PPDBStatus, notes?: string) => void;

  contactMessages: ContactMessage[];
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => void;

  // Admin session
  adminUser: AdminUser | null;
  loginAdmin: (role: AdminRole) => void;
  logoutAdmin: () => void;
  switchAdminRole: (role: AdminRole) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  FOUNDATION: 'catursakti_foundation_v1',
  UNITS: 'catursakti_units_v1',
  NEWS: 'catursakti_news_v1',
  GALLERY: 'catursakti_gallery_v1',
  REGISTRANTS: 'catursakti_registrants_v1',
  MESSAGES: 'catursakti_messages_v1',
  ADMIN: 'catursakti_admin_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('beranda');
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<GalleryItem | null>(null);

  // Initialize from LocalStorage or fall back to INITIAL
  const [foundation, setFoundation] = useState<FoundationProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FOUNDATION);
      return saved ? JSON.parse(saved) : INITIAL_FOUNDATION;
    } catch {
      return INITIAL_FOUNDATION;
    }
  });

  const [schoolUnits, setSchoolUnits] = useState<Record<'smp' | 'sma', SchoolUnitInfo>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UNITS);
      return saved ? JSON.parse(saved) : INITIAL_SCHOOL_UNITS;
    } catch {
      return INITIAL_SCHOOL_UNITS;
    }
  });

  const [newsList, setNewsList] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NEWS);
      return saved ? JSON.parse(saved) : INITIAL_NEWS;
    } catch {
      return INITIAL_NEWS;
    }
  });

  const [galleryList, setGalleryList] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return saved ? JSON.parse(saved) : INITIAL_GALLERY;
    } catch {
      return INITIAL_GALLERY;
    }
  });

  const [registrants, setRegistrants] = useState<PPDBRegistrant[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTRANTS);
      return saved ? JSON.parse(saved) : INITIAL_REGISTRANTS;
    } catch {
      return INITIAL_REGISTRANTS;
    }
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FOUNDATION, JSON.stringify(foundation));
  }, [foundation]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.UNITS, JSON.stringify(schoolUnits));
  }, [schoolUnits]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(newsList));
  }, [newsList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(galleryList));
  }, [galleryList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REGISTRANTS, JSON.stringify(registrants));
  }, [registrants]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(adminUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN);
    }
  }, [adminUser]);

  // Operations
  const updateFoundation = (updated: Partial<FoundationProfile>) => {
    setFoundation((prev) => ({ ...prev, ...updated }));
  };

  const updateSchoolUnit = (id: 'smp' | 'sma', updated: Partial<SchoolUnitInfo>) => {
    setSchoolUnits((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...updated },
    }));
  };

  const addNews = (newsData: Omit<NewsArticle, 'id' | 'views'>) => {
    const newArticle: NewsArticle = {
      ...newsData,
      id: `news-${Date.now()}`,
      views: 0,
    };
    setNewsList((prev) => [newArticle, ...prev]);
  };

  const updateNews = (id: string, updated: Partial<NewsArticle>) => {
    setNewsList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteNews = (id: string) => {
    setNewsList((prev) => prev.filter((item) => item.id !== id));
  };

  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: `gal-${Date.now()}`,
    };
    setGalleryList((prev) => [newItem, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryList((prev) => prev.filter((item) => item.id !== id));
  };

  const addRegistrant = (
    data: Omit<PPDBRegistrant, 'id' | 'registrationNumber' | 'registrationDate' | 'status'>
  ) => {
    const count = registrants.filter((r) => r.targetUnit === data.targetUnit).length + 1;
    const regCode = generateRegistrationNumber(data.targetUnit, count);
    const newRegistrant: PPDBRegistrant = {
      ...data,
      id: `reg-${Date.now()}`,
      registrationNumber: regCode,
      registrationDate: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      status: 'Menunggu Verifikasi',
    };
    setRegistrants((prev) => [newRegistrant, ...prev]);
    return newRegistrant;
  };

  const updateRegistrantStatus = (id: string, status: PPDBStatus, notes?: string) => {
    setRegistrants((prev) =>
      prev.map((reg) =>
        reg.id === id ? { ...reg, status, statusNotes: notes ?? reg.statusNotes } : reg
      )
    );
  };

  const addContactMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      isRead: false,
    };
    setContactMessages((prev) => [newMsg, ...prev]);
  };

  const loginAdmin = (role: AdminRole) => {
    const labels: Record<AdminRole, string> = {
      super_admin: 'Super Admin Yayasan',
      admin_smp: 'Admin SMP Catur Sakti',
      admin_sma: 'Admin SMA Catur Sakti',
    };
    const user: AdminUser = {
      username: role === 'super_admin' ? 'admin_yayasan' : role,
      name: role === 'super_admin' ? 'Dijah Diana (Pimpinan)' : 'Operator Deni',
      role,
      roleLabel: labels[role],
    };
    setAdminUser(user);
  };

  const logoutAdmin = () => {
    setAdminUser(null);
  };

  const switchAdminRole = (role: AdminRole) => {
    if (adminUser) {
      loginAdmin(role);
    }
  };

  // Scroll to top whenever activePage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedNews,
        setSelectedNews,
        selectedGalleryImage,
        setSelectedGalleryImage,
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
        addRegistrant,
        updateRegistrantStatus,
        contactMessages,
        addContactMessage,
        adminUser,
        loginAdmin,
        logoutAdmin,
        switchAdminRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
