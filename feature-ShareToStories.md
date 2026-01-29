# Share to Instagram Stories — Selfie Plus

## Ringkasan Tujuan
- Memungkinkan pengguna membagikan hasil foto Selfie Plus ke Instagram Stories dalam format yang konsisten (1080×1920) dengan bingkai brand dan tampilan rapi.
- Menjaga kualitas hasil, menghindari foto terpotong, dan membuat alur berbagi terasa cepat dan stabil di Android dan iOS.

## Hasil Akhir
- Alur “unduh → komposisi → ekspor → buka Instagram → bersihkan file sementara” berjalan end‑to‑end.
- Foto di‑compose dengan bingkai brand (dan watermark opsional) lalu diekspor sebagai satu gambar siap pakai untuk Stories.
- Masalah crop terselesaikan: foto tidak lagi terpotong oleh bingkai yang miring, tetap proporsional, dan terlihat utuh.

## Alur Pengguna Singkat
1. Pengguna membuka detail transaksi dan memilih foto.
2. Menekan tombol Share untuk Stories.
3. Aplikasi mengunduh foto (jika sumbernya URL), menyusun komposisi dengan bingkai, mengekspor gambar 1080×1920, lalu membuka Instagram Stories composer.
4. Setelah berbagi, file sementara dibersihkan otomatis.

## Pendekatan Teknis
- Komposisi visual di kanvas dan ekspor menggunakan mekanisme capture tampilan. Kanvas dirender pada ukuran tampilan yang lebih kecil demi performa, namun hasil ekspor dinaikkan ke resolusi 1080×1920.
- Layering disusun foto → bingkai → watermark sehingga bingkai selalu berada di atas foto (memastikan border/tepi bingkai terlihat rapi).
- Strategi anti‑crop: fitting “contain” + margin skala aman agar foto tidak tertutup oleh kemiringan bingkai. Untuk kasus khusus, tersedia opsi rotasi foto/bingkai agar komposisi lebih selaras.
- Berbagi ke Instagram memanfaatkan abstraksi library share sehingga perilaku Android (content URI, FileProvider) dan iOS (pasteboard/URL scheme) ditangani secara konsisten.
- Housekeeping: pembersihan file sementara dilakukan dengan jeda singkat supaya Instagram sempat membaca file.

## Tantangan & Solusi
- Foto terpotong oleh bingkai miring → gunakan fit “contain” dengan skala aman, pusatkan ulang secara presisi, dan sediakan opsi rotasi.
- Stabilitas Android saat ekspor gambar → gunakan mekanisme capture yang terbukti stabil dan lakukan upscaling saat ekspor, bukan saat render di layar.
- Manajemen file lokal vs URL → selalu unduh sumber jarak jauh ke cache lokal agar proses komposisi dan berbagi tidak bergantung jaringan saat terakhir.

## Fine‑Tuning (Siap Pakai, Dinonaktifkan Secara Default)
- Dibangun panel non‑destruktif untuk mengatur skala (zoom‑out/zoom‑in halus) dan kemiringan (derajat) secara langsung di UI.
- Panel dan state disimpan sebagai komentar, sehingga bisa diaktifkan kapan pun tanpa perubahan arsitektur.

## Integrasi Platform
- Android: FileProvider dan deklarasi query ke Instagram disiapkan agar background image dapat dikirim via content URI dan aplikasi Instagram terdeteksi.
- iOS: Pengiriman data ke Instagram Stories memanfaatkan jalur resmi library share; fallback ke lembar berbagi sistem jika Instagram tidak tersedia.

## Performa & Kebersihan
- Render on‑screen yang ringan, ekspor resolusi tinggi saat capture → menjaga pengalaman UI tetap mulus.
- Pembersihan file sementara dilakukan otomatis untuk menghindari penumpukan storage pengguna.
- Logging dikondisikan hanya pada mode pengembangan agar tidak mengganggu produksi.

## Ruang Pengembangan Lanjutan
- Clip presisi ke jendela bagian dalam bingkai jika diinginkan bingkai benar‑benar menjadi latar, bukan overlay.
- Dukungan stiker/teks brand, tautan atribusi, dan varian tema.
- Dukungan video untuk Stories.
- Menyimpan preferensi fine‑tuning per perangkat atau mengontrol default dari konfigurasi jarak jauh.

## Kontribusi Utama yang Saya Kerjakan
- Merancang dan mengimplementasikan alur Share to Stories end‑to‑end yang andal.
- Menyusun strategi komposisi anti‑crop dengan contain fit + margin skala, serta opsi rotasi untuk penyelarasan.
- Menyediakan panel fine‑tuning yang bisa diaktifkan sewaktu‑waktu tanpa mengubah arsitektur inti.
- Merapikan utilitas file (unduh/bersih‑bersih), penamaan, logging pengembangan, dan integrasi platform.

