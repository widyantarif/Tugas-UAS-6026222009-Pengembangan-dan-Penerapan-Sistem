# Tugas-UAS-6026222009-Pengembangan-dan-Penerapan-Sistem

### Nama: Widyantari Febiyanti (6026222009)
-----------------

## Package untuk service node.js
Berikut adalah langkah yang harus dilakukan untuk meng-install package yang dibutuhkan untuk pembuatan service berbasis node.js: 
1. Pastikan telah meng-install software Node.js, XAMPP (sebagai database local), POSTMAN (sebagai media pemeriksa apakah service sudah berjalan atau belum) serta Editor code yang biasa digunakan
    - Untuk mendownload Node.js bisa [disini](https://nodejs.org/en/download)
    - Untuk mendownload XAMPP bisa [disini](https://www.apachefriends.org/download.html)
    - Untuk mendownload POSTMAN bisa [disini](https://www.postman.com/downloads/)

2. Membuat direktori untuk membuat service dengan perintah
```
mkdir [nama file]
```
3. Meng-install node pada direktori yang telah dibuat dengan perintah
```
npm init
```
4. Meng-install mysql dan express pada direktori yang bertujuan sebagai konfigurasi antara aplikasi yang dibuat dan database lokal menggunakan perintah
```
npm install mysql express
```
5. Meng-install nodemon yang bertujuan untuk mempermudah menjalankan aplikasi service yang baru diupdate sehingga tidak perlu men-terminate yang sudah berjalan. Install menggunakan perintah
```
npm install nodemon
```
serta menambahkan script pada package.json sebagai berikut
```
 "start": "nodemon [nama file.js]"
```

Untuk source code lengkap, bisa dilihat disini [package.json](https://github.com/widyantarif/Tugas-UAS-6026222009-Pengembangan-dan-Penerapan-Sistem/blob/main/package.json)

## Pembuatan database dan konfigurasi
1. Pembuatan database lokal sesuai seperti yang dilampirkan dibawah. 
![](https://github.com/widyantarif/Tugas-UAS-6026222009-Pengembangan-dan-Penerapan-Sistem/blob/main/Dokumentasi%20Tugas%20EAS/struktur%20database.JPG)

## Pembuatan service menggunakan Node.js
Berikut adalah penjelasan pembuatan service berbasis node.js:
1. Penjelasan app-get
```
app.get('/get-user', function (req, res) {
    const queryStr = 'SELECT id, nama, kategori FROM user';
    conn.query(queryStr, (err, results) => {
      if (err) {
          res.status(500).json({
              success: false,
              message: err.sqlMessage,
              data: null
          });
      } else {
        res.status(200).json({
          "success" : true,
          "message" : "Sukses menampilkan data",
          "data" : results
```
dengan menggunakan implementasi __GET__ yaitu untuk menampilkan data yang telah tersimpan didalam database. Dalam menggambil data yang ada didalam database, menggunakan perintah
```
SELECT id, nama, kategori FROM user
```
yaitu untuk mendapatkan nilai dari kolom id, nama dan kategori dari database user. 
```
 if (err) {
          res.status(500).json({
              success: false,
              message: err.sqlMessage,
              data: null
          });
      } else {
        res.status(200).json({
          "success" : true,
          "message" : "Sukses menampilkan data",
          "data" : results
  ```
 yaitu untuk menampilkan response kepada client apakah terjadi kesalahan (eror) atau keberhasilan. akan muncul pesan seperti yang tertera. Berikut adalah gambaran apabila dilakukan test didalam postman 
 
3. Penjelasan app-store
4. Penjelasan app-update


[payment](https://github.com/widyantarif/Tugas-UAS-6026222009-Pengembangan-dan-Penerapan-Sistem/blob/main/client/payment.html)
