import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Send,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';

export const KontakView: React.FC = () => {
  const { foundation, addContactMessage } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    addContactMessage({
      fullName: name.trim(),
      email: email.trim() || 'Tidak disertakan',
      phone: phone.trim() || 'Tidak disertakan',
      subject: subject.trim() || 'Pesan Umum Melalui Website',
      message: message.trim(),
    });

    setIsSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-14 sm:py-18 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <span>Hubungi Kami</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Kontak & Lokasi Yayasan Catur Sakti
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            Kami siap melayani kebutuhan informasi pendidikan, kunjungan kampus, pendaftaran siswa
            baru, maupun kerja sama kemitraan.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card Alamat */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-navy-900">Alamat Yayasan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {foundation.address}, {foundation.subdistrict}, {foundation.district},{' '}
              {foundation.province} {foundation.postalCode}
            </p>
          </div>

          {/* Card WhatsApp / Telp */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-navy-900">Telepon & WhatsApp</h3>
              <p className="text-xs text-slate-600 font-mono">{foundation.phone}</p>
            </div>
            <a
              href={`https://wa.me/62${foundation.phone.replace(/^0/, '')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-bold hover:underline pt-2"
            >
              <span>Kirim Pesan WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card Email */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-navy-900">Surat Elektronik (Email)</h3>
              <p className="text-xs text-slate-600 break-all">{foundation.email}</p>
            </div>
            <a
              href={`mailto:${foundation.email}`}
              className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-bold hover:underline pt-2"
            >
              <span>Kirim Email</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card Instagram */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold">
                <Instagram className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-navy-900">Instagram Resmi</h3>
              <p className="text-xs text-slate-600">@yayasancatursakti</p>
            </div>
            <a
              href={foundation.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-pink-600 font-bold hover:underline pt-2"
            >
              <span>Buka Profil Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2-Column Split: Message Form & Google Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-600">
                Formulir Komunikasi
              </span>
              <h2 className="text-2xl font-display font-bold text-navy-900">
                Kirim Pesan ke Pengurus Yayasan
              </h2>
              <p className="text-xs text-slate-500">
                Pertanyaan, saran, dan koordinasi Anda akan diteruskan ke tim pengelola yayasan.
              </p>
            </div>

            {isSubmitted && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Terima kasih! Pesan Anda telah berhasil dikirimkan ke administrasi Yayasan Catur Sakti.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Rahmat Hidayat"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Nomor WhatsApp / Telepon
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 082235174743"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Anda
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Subjek / Perihal
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Contoh: Informasi Mutasi / Legalisir Ijazah"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Isi Pesan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan pesan, pertanyaan, atau permohonan informasi Anda di sini..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href={`https://wa.me/62${foundation.phone.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Atau hubungi langsung WhatsApp Panitia</span>
                </a>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider bg-navy-900 hover:bg-navy-800 text-amber-400 shadow-md transition-colors flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Pesan</span>
                </button>
              </div>
            </form>
          </div>

          {/* Google Maps Embed & Office Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
              <h3 className="font-display font-bold text-lg text-navy-900">
                Peta Lokasi Kampus Sekolah
              </h3>
              <p className="text-xs text-slate-500">
                Margatiga, Kabupaten Lampung Timur, Lampung 34386.
              </p>

              {/* Embedded Google Maps */}
              <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                <iframe
                  title="Peta Lokasi Yayasan Catur Sakti Margatiga"
                  src="https://maps.google.com/maps?q=Margatiga,+Lampung+Timur,+Indonesia&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
                <span>Kecamatan Margatiga, Lampung Timur</span>
                <a
                  href="https://maps.google.com/?q=Margatiga+Lampung+Timur"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-600 font-bold hover:underline"
                >
                  Buka di Google Maps
                </a>
              </div>
            </div>

            {/* Jam Operasional Pelayanan */}
            <div className="bg-navy-900 text-white rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold">
                <Clock className="w-4 h-4" />
                <span>Jam Pelayanan Tata Usaha</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-navy-800">
                  <span>Senin – Kamis</span>
                  <span className="font-semibold text-white">07:30 – 14:00 WIB</span>
                </div>
                <div className="flex justify-between py-1 border-b border-navy-800">
                  <span>Jumat</span>
                  <span className="font-semibold text-white">07:30 – 11:30 WIB</span>
                </div>
                <div className="flex justify-between py-1 border-b border-navy-800">
                  <span>Sabtu</span>
                  <span className="font-semibold text-white">07:30 – 13:00 WIB</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Minggu & Hari Libur Nasional</span>
                  <span className="text-amber-400 font-semibold">Tutup (Online Tetap Buka)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
