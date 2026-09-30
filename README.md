# Birthday Surprise Website — Editable Version

Versi ini sudah mengganti `envelope.jpg`, `hero.jpg`, `letter.jpg`, dan `loading.jpg` dengan **HTML/CSS manual + SVG editable**.

## Cara menjalankan di VS Code
1. Buka folder project di VS Code.
2. Pastikan `index.html`, `style.css`, `script.js`, dan folder `assets` berada dalam satu folder.
3. Install extension **Live Server** (opsional, tapi paling mudah).
4. Klik kanan `index.html` → **Open with Live Server**.

## File JPG yang sudah dihapus
- `assets/envelope.jpg`
- `assets/hero.jpg`
- `assets/letter.jpg`
- `assets/loading.jpg`

Keempat scene tersebut sekarang tidak bergantung pada screenshot JPG.

## Scene yang sekarang berupa kode manual
### Loading
Edit di:
- `index.html` → cari `scene-loading`
- `style.css` → cari `LOADING - manual HTML/CSS`

### Envelope
Edit di:
- `index.html` → cari `scene-envelope`
- `style.css` → cari `ENVELOPE - manual HTML/CSS`

Amplop, lipatan, kertas, dan wax seal dibuat dengan CSS. Tidak ada gambar amplop.

### Hero
Edit teks dan tombol di:
- `index.html` → cari `scene-hero`
- `style.css` → cari `HERO - editable SVG + coded layout`

Visual latarnya memakai SVG editable:
- `assets/hero-couple.svg`

File SVG adalah file teks. Bisa dibuka langsung di VS Code dan warna/bentuknya dapat diedit.

### Letter
Edit isi surat di:
- `index.html` → cari `scene-letter`
- `style.css` → cari `LETTER - manual HTML/CSS`

Foto/memory di samping surat diganti menjadi SVG editable:
- `assets/memory-1.svg`
- `assets/memory-2.svg`
- `assets/memory-3.svg`

## Mengganti nama, tanggal, dan passcode
Edit bagian paling atas `script.js`:

```js
const CONFIG = {
  passcode: '010101',
  displayDate: '01/01/01',
  nickname: 'Babe'
};
```

`nickname` otomatis dipakai pada polaroid, amplop, dan hero.

## Warna utama
Edit CSS variable pada bagian paling atas `style.css`:

```css
:root{
  --red:#9e1738;
  --red-deep:#7e0f2b;
  --red-soft:#b6284e;
  --cream:#fff7e9;
  --paper:#fff8e8;
  --ink:#4e1730;
  --pink:#e8a7b8;
  --gold:#d1a84f;
}
```

Dengan cara ini, warna utama website bisa diubah tanpa mencari seluruh kode satu per satu.

## Aset yang tetap raster
- `assets/polaroid_photo.jpg`
- `assets/passcode_ref.jpg`

`polaroid_photo.jpg` tetap dipakai sebagai foto pada scene passcode. Jika ingin menggantinya, cukup timpa dengan foto sendiri atau ubah `src` pada `index.html`.

## Alur interaksi
- Masukkan passcode.
- Scene tanggal tampil.
- Loading berjalan otomatis.
- Klik wax seal pada amplop.
- Klik **Read Your Letter**.
- Klik **one more little surprise**.
- Klik cake → mode *Make a Wish*.
- Pilih warna cake.
- Putar lagu ulang tahun.
- Klik **Blow the Candles** untuk fireworks.
