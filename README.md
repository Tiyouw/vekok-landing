# VEKOK — Vespa Klotok Sabtuan (CakNdut)

Landing page statis untuk warkop **VEKOK (Vespa Klotok CakNdut)** di Pasar
Sabtuan, Jember. Desain berasal dari ekspor **Google Stitch** (project
*Vekok Street Coffee Landing Page*, screen *Sticky Nav*), diubah menjadi
source yang siap produksi.

Gaya: **zine / warkop brutalism** — border tebal hitam, hard shadow, halftone
dot, marquee ticker, sticker-stamp badge, aksen kraft `#D49B45`.

---

## Stack

| Bagian | Pilihan |
|---|---|
| Markup | `index.html` — HTML statis, tanpa framework JS |
| CSS | Tailwind CSS v3 (CLI build, purge aktif) → `dist/style.css` |
| Font | Google Fonts: Syne, Space Grotesk, Plus Jakarta Sans |
| JS | Vanilla — IntersectionObserver (reveal + stamp pop) + parallax rAF |
| Hosting | Vercel (static, `framework: null`) |

Tanpa bundler, tanpa runtime dependency. `dist/style.css` **di-commit** supaya
situs tetap tampil benar walau build Vercel dimatikan (`buildCommand: null`).

## Struktur

```
vekok-landing/
├── index.html            # halaman tunggal (7 section)
├── src/input.css         # entry Tailwind + layer komponen kustom
├── tailwind.config.js    # warna/font/animation brand
├── dist/style.css        # hasil build (committed, ~26 KB minified)
├── assets/               # logo + og-image
├── vercel.json           # static hosting + cache & security headers
├── robots.txt, sitemap.xml
└── package.json
```

## Perintah

```bash
npm install
npm run dev      # tailwind --watch
npm run build    # tailwind --minify -> dist/style.css
npm run serve    # http://localhost:4173
```

## Section

1. `#hero` — sticky nav, lockup logo, tagline, CTA, motif vespa SVG inline
2. Marquee ticker (2 baris, arah berlawanan)
3. `#jam-operasional` — kartu Sesi Pagi 06.00–12.00 / Sesi Sore 16.00–20.00
4. `#menu` — Daftar Ma'min: Kopi (7), Teh (6 + air mineral), Godogan & Snack (8), semua Rp5.000
5. `#tumbler` — Isi ulang tumbler: Robusta / Arabica / Liberica
6. `#lokasi` — alamat, checklist fasilitas, kartu peta vektor + CTA Maps & WA
7. Footer — tautan cepat, sosial, kredit

## Perubahan dari ekspor Stitch

| # | Perubahan | Alasan |
|---|---|---|
| 1 | Tailwind CDN → CLI build + purge | CDN menjalankan compiler ~400 KB di browser; hasil build 26 KB CSS |
| 2 | `border-3` / `border-b-3` → `border-[3px]` / `border-b-[3px]` | **Bug desain asli.** Tailwind tak punya skala `3` (hanya 0/2/4/8), jadi 11 elemen kehilangan border tanpa error |
| 3 | 3 URL gambar remote → `assets/logo.png` | Ketiga `lh3.googleusercontent.com/aida-public/...` mengembalikan **byte identik** (jpeg 387×387, md5 `d06e6263…`); Stitch memakai satu aset yang sama |
| 4 | + meta description/OG/Twitter/canonical/theme-color/favicon | Ekspor Stitch hanya punya `<title>` |
| 5 | + JSON-LD `CafeOrCoffeeShop` (jam buka, priceRange, alamat) | Rich result lokal |
| 6 | + `robots.txt`, `sitemap.xml` | Crawlability |
| 7 | + skip-link, `aria-label` logo, `decoding="async"`, `loading="lazy"` | Aksesibilitas & LCP |
| 8 | + `vercel.json` (cleanUrls, immutable cache untuk `/assets` & `/dist`, nosniff/X-Frame-Options/Referrer-Policy/Permissions-Policy) | Header keamanan & cache |
| 9 | Hapus plugin CDN `forms` + `container-queries` | Tidak dipakai satu pun di markup |

## Catatan

- Nomor WhatsApp: tombol "CHAT CAKNDUT" + ikon WA footer → `wa.me/6282132341102` (prefill pesan).
- Maps: CTA "LIHAT LOKASI DI MAPS" → short link GBP `maps.app.goo.gl/u8kqErAmz45PEDtc9`
  (listing "Vespa Klotok - Kopi CakNdut (VEKOK)", Jl. Basuki Rahmat, Tegal Besar
  Wetan, Pasar Sabtuan, Kab. Jember 68131 — nomor & alamat juga masuk JSON-LD).
- Domain produksi: `https://vekok.tiyoouw.app` (custom domain Vercel);
  `https://vekok-landing.vercel.app` tetap aktif sebagai alias. Canonical, OG,
  sitemap, dan JSON-LD memakai domain utama.
- IG/TikTok footer masih link kosong `instagram.com`/`tiktok.com` → kirim
  username kalau mau diisi.
