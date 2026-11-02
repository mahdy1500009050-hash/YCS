import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateRegistrationNumber,
  validateNISN,
  validateNIK,
  validatePhone,
  filterRegistrants,
  filterNews,
  getAdminPermissions,
} from './ppdb';
import { PPDBRegistrant, NewsArticle } from '../types';

test('generateRegistrationNumber formats correctly', () => {
  const currentYear = new Date().getFullYear();
  const regSMP = generateRegistrationNumber('smp', 1);
  const regSMA = generateRegistrationNumber('sma', 42);

  assert.equal(regSMP, `REG-${currentYear}-SMP-001`);
  assert.equal(regSMA, `REG-${currentYear}-SMA-042`);
});

test('validateNISN verifies exactly 10 digits', () => {
  assert.equal(validateNISN('0081234567').isValid, true);
  assert.equal(validateNISN('12345').isValid, false);
  assert.equal(validateNISN('008123456789').isValid, false);
  assert.equal(validateNISN('008123456A').isValid, false);
  assert.equal(validateNISN('').isValid, false);
});

test('validateNIK verifies exactly 16 digits', () => {
  assert.equal(validateNIK('1807010101900001').isValid, true);
  assert.equal(validateNIK('1807010101').isValid, false);
  assert.equal(validateNIK('1807010101900001999').isValid, false);
  assert.equal(validateNIK('').isValid, false);
});

test('validatePhone verifies valid Indonesian phone numbers', () => {
  assert.equal(validatePhone('082235174743').isValid, true);
  assert.equal(validatePhone('+62 822-3517-4743').isValid, true);
  assert.equal(validatePhone('02112345').isValid, false);
  assert.equal(validatePhone('').isValid, false);
});

test('filterRegistrants filters by keyword, unit, and status', () => {
  const mockData: PPDBRegistrant[] = [
    {
      id: '1',
      registrationNumber: 'REG-2026-SMP-001',
      targetUnit: 'smp',
      fullName: 'Ahmad Fauzi',
      nisn: '0081234567',
      nik: '1807010101900001',
      gender: 'Laki-laki',
      birthPlace: 'Margatiga',
      birthDate: '2012-05-10',
      religion: 'Islam',
      address: 'Sukaraja Tiga',
      parentName: 'Hasan',
      parentPhone: '081234567890',
      parentJob: 'Wiraswasta',
      previousSchool: 'SDN 1 Sukaraja Tiga',
      registrationDate: '2026-05-01',
      status: 'Menunggu Verifikasi',
      documentsUploaded: ['Ijazah', 'KK'],
    },
    {
      id: '2',
      registrationNumber: 'REG-2026-SMA-001',
      targetUnit: 'sma',
      fullName: 'Siti Rahmawati',
      nisn: '0059876543',
      nik: '1807010101900002',
      gender: 'Perempuan',
      birthPlace: 'Metro',
      birthDate: '2009-08-15',
      religion: 'Islam',
      address: 'Margatiga',
      parentName: 'Bambang',
      parentPhone: '081398765432',
      parentJob: 'PNS',
      previousSchool: 'SMP Catur Sakti',
      smaMajorPreference: 'MIPA',
      registrationDate: '2026-05-02',
      status: 'Diterima',
      documentsUploaded: ['Ijazah', 'SKL', 'KK', 'Akta'],
    },
  ];

  // Search by name
  assert.equal(filterRegistrants(mockData, 'Ahmad', 'all', 'all').length, 1);
  // Filter by unit
  assert.equal(filterRegistrants(mockData, '', 'sma', 'all').length, 1);
  assert.equal(filterRegistrants(mockData, '', 'smp', 'all')[0].fullName, 'Ahmad Fauzi');
  // Filter by status
  assert.equal(filterRegistrants(mockData, '', 'all', 'Diterima').length, 1);
  assert.equal(filterRegistrants(mockData, '', 'all', 'Tidak Diterima').length, 0);
});

test('getAdminPermissions grants correct access per role', () => {
  const superPerm = getAdminPermissions('super_admin');
  assert.equal(superPerm.canEditFoundation, true);
  assert.equal(superPerm.canManageSMP, true);
  assert.equal(superPerm.canManageSMA, true);

  const smpPerm = getAdminPermissions('admin_smp');
  assert.equal(smpPerm.canEditFoundation, false);
  assert.equal(smpPerm.canManageSMP, true);
  assert.equal(smpPerm.canManageSMA, false);

  const smaPerm = getAdminPermissions('admin_sma');
  assert.equal(smaPerm.canEditFoundation, false);
  assert.equal(smaPerm.canManageSMP, false);
  assert.equal(smaPerm.canManageSMA, true);
});
