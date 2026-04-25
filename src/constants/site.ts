/**
 * Site-wide constants for PT. Yogura Tekindo (YOTEK)
 * ─────────────────────────────────────────────────
 * Edit this file to update taglines, company info,
 * CEO bio, and other site-wide copy.
 */

export const SITE = {
  name: "YOTEK",
  fullName: "PT. Yogura Tekindo",
  tagline: "Integritas dalam Sinergi.\nKeunggulan di Setiap Sektor.",
  description:
    "PT. Yogura Tekindo (YOTEK) adalah perusahaan group yang bergerak di berbagai sektor industri dengan komitmen pada integritas, sinergi, dan keunggulan.",
  url: "https://yotek.co.id",
  email: "info@yotek.co.id",
  phone: "+62 21 xxxx xxxx",
  address: "Pekanbaru, Indonesia",
};

export const CEO = {
  name: "Oyong Wisman",
  title: "Presiden Direktur",
  bio: "Dengan pengalaman lebih dari dua dekade di industri strategis, kepemimpinan beliau telah membawa Yotek bertransformasi dari perusahaan lokal menjadi pemain utama berskala nasional. Beliau berkomitmen untuk terus menghadirkan inovasi dan integritas di setiap lini bisnis Yotek Group.",
  image: "oyongwisman.avif",
};

export const SOCIAL = {
  instagram: "https://instagram.com/yotek",
  linkedin: "https://linkedin.com/company/yotek",
  facebook: "https://facebook.com/yotek",
  youtube: "https://youtube.com/@yotek",
};

export const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/about" },
  { label: "Berita", href: "/news" },
  { label: "Karir", href: "/career" },
  { label: "Kontak", href: "/contact" },
];

export const STATS = [
  {
    value: "100%",
    label: "Komitmen Kualitas",
    description: "Standar tertinggi dalam setiap proyek",
  },
  {
    value: "100%",
    label: "Kepuasan Klien",
    description: "Dedikasi penuh untuk hasil terbaik",
  },
  {
    value: "10+",
    label: "Tahun Pengalaman",
    description: "Pengalaman lintas sektor industri",
  },
];

// ── FORM ENDPOINTS ──
// Untuk testing/development → Formspark (aktif sekarang)
// Untuk production di shared hosting → ganti ke PHP
export const FORM_ACTION = "https://submit-form.com/KkZ1FKs9s";
export const FORM_ACTION_CAREER = "https://submit-form.com/sNG4Q8jjb";
// export const FORM_ACTION = "/api/contact.php";        // ← Aktifkan ini saat deploy ke shared hosting
// export const FORM_ACTION_CAREER = "/api/career.php";  // ← Aktifkan ini saat deploy ke shared hosting
