import { AdminRole, NewsArticle, PPDBRegistrant, SchoolUnitType } from '../types';

/**
 * Generates a standardized registration code
 * Format: REG-YYYY-{UNIT}-{000}
 */
export function generateRegistrationNumber(unit: SchoolUnitType, sequence: number): string {
  const year = new Date().getFullYear();
  const unitCode = unit.toUpperCase();
  const padded = String(sequence).padStart(3, '0');
  return `REG-${year}-${unitCode}-${padded}`;
}

/**
 * Validates Indonesian National Student Identification Number (NISN)
 * Exactly 10 numeric digits
 */
export function validateNISN(nisn: string): { isValid: boolean; error?: string } {
  const trimmed = nisn.trim();
  if (!trimmed) {
    return { isValid: false, error: 'NISN wajib diisi' };
  }
  if (!/^\d{10}$/.test(trimmed)) {
    return { isValid: false, error: 'NISN harus terdiri dari tepat 10 digit angka' };
  }
  return { isValid: true };
}

/**
 * Validates Indonesian National Identity Number (NIK)
 * Exactly 16 numeric digits
 */
export function validateNIK(nik: string): { isValid: boolean; error?: string } {
  const trimmed = nik.trim();
  if (!trimmed) {
    return { isValid: false, error: 'NIK wajib diisi' };
  }
  if (!/^\d{16}$/.test(trimmed)) {
    return { isValid: false, error: 'NIK harus terdiri dari tepat 16 digit angka' };
  }
  return { isValid: true };
}

/**
 * Validates Indonesian phone/WhatsApp number
 */
export function validatePhone(phone: string): { isValid: boolean; error?: string } {
  const cleaned = phone.replace(/[\s\-\+]/g, '');
  if (!cleaned) {
    return { isValid: false, error: 'Nomor telepon/WhatsApp wajib diisi' };
  }
  if (!/^(08|628)\d{8,12}$/.test(cleaned)) {
    return {
      isValid: false,
      error: 'Nomor telepon tidak valid (contoh: 082235174743)',
    };
  }
  return { isValid: true };
}

/**
 * Filters registrants by search keyword, target school unit, and status
 */
export function filterRegistrants(
  list: PPDBRegistrant[],
  keyword: string,
  unitFilter: 'all' | 'smp' | 'sma',
  statusFilter: string
): PPDBRegistrant[] {
  const lowerKeyword = keyword.trim().toLowerCase();

  return list.filter((item) => {
    const matchKeyword =
      !lowerKeyword ||
      item.fullName.toLowerCase().includes(lowerKeyword) ||
      item.registrationNumber.toLowerCase().includes(lowerKeyword) ||
      item.nisn.includes(lowerKeyword) ||
      item.previousSchool.toLowerCase().includes(lowerKeyword);

    const matchUnit = unitFilter === 'all' || item.targetUnit === unitFilter;
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchKeyword && matchUnit && matchStatus;
  });
}

/**
 * Filters news articles by search keyword and category
 */
export function filterNews(
  articles: NewsArticle[],
  keyword: string,
  category: string
): NewsArticle[] {
  const lowerKeyword = keyword.trim().toLowerCase();

  return articles.filter((article) => {
    const matchCategory = category === 'Semua' || article.category === category;
    const matchKeyword =
      !lowerKeyword ||
      article.title.toLowerCase().includes(lowerKeyword) ||
      article.excerpt.toLowerCase().includes(lowerKeyword) ||
      article.content.toLowerCase().includes(lowerKeyword);

    return matchCategory && matchKeyword;
  });
}

/**
 * Returns role-based permission capabilities
 */
export function getAdminPermissions(role: AdminRole): {
  canEditFoundation: boolean;
  canManageSMP: boolean;
  canManageSMA: boolean;
} {
  switch (role) {
    case 'super_admin':
      return { canEditFoundation: true, canManageSMP: true, canManageSMA: true };
    case 'admin_smp':
      return { canEditFoundation: false, canManageSMP: true, canManageSMA: false };
    case 'admin_sma':
      return { canEditFoundation: false, canManageSMP: false, canManageSMA: true };
    default:
      return { canEditFoundation: false, canManageSMP: false, canManageSMA: false };
  }
}
