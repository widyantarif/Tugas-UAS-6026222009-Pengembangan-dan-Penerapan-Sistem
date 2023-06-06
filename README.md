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

2. Konfigurasi koneksi antara node.js dengan database dengan source code dibawah. 
```
const mysql = require('mysql');
const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "tugas",
    charset: "utf8mb4",
    timezone: "+07:00"
});

conn.getConnection((err) => {
    if (err) throw err
    console.log ('DB Connected');
});

module.exports = conn;
```
Untuk source code lengkap bisa dilihat [disini](https://github.com/widyantarif/Tugas-UAS-6026222009-Pengembangan-dan-Penerapan-Sistem/blob/main/config/db.js)

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
![](https://github.com/widyantarif/Tugas-UAS-6026222009-Pengembangan-dan-Penerapan-Sistem/blob/main/Dokumentasi%20Tugas%20EAS/postman%20get-user.JPG)

2. Penjelasan app-store
```
app.post('/store-user', function (req, res) {
    console.log(req.body);
    const param = req.body;
    const nama = param.nama;
    const kategori = param.kategori;
    const now = new Date();

    const queryStr = 'INSERT INTO user (nama, kategori, created_by) VALUES (?, ?, ?)';
    const values = [nama, kategori, now];
  
    conn.query(queryStr, values, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.sqlMessage,
            data: null
        });
      } else {
        res.status(200).json({
          "success" : true,
          "message" : "Sukses menyimpan data",
          "data" : null
```

dengan menggunakan implementasi __POST__ yaitu untuk menambahkan data yang kedalam database. Dalam menambah data yang ada didalam database, menggunakan perintah
```
INSERT INTO user (nama, kategori, created_by) VALUES (?, ?, ?)
```
yaitu kedalam kolom nama dan kategori. 

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
![](https://github.com/widyantarif/Tugas-UAS-6026222009-Pengembangan-dan-Penerapan-Sistem/blob/main/Dokumentasi%20Tugas%20EAS/postman%20store-user.JPG)

3. Penjelasan app-update
```
app.put('/update-user', function (req, res) {
    const param = req.body;
    const id = param.id;
    const nama = param.nama;
    const kategori = param.kategori;
    const queryStr = 'UPDATE user SET nama = ?, kategori = ? WHERE id = ?';
    const values = [nama, kategori, id];
    conn.query(queryStr, values, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.sqlMessage,
            data: null
        });
      } else {
        res.status(200).json({
          "success" : true,
          "message" : "Sukses mengubah data",
          "data" : null
```

dengan menggunakan implementasi __PUT__ yaitu untuk menyunting data yang sudah ada di database. Dalam menyunting data yang sudah ada didalam database, menggunakan perintah

```
UPDATE user SET nama = ?, kategori = ? WHERE id = ?
```

yaitu mengambil id sebagai primary key untuk mengambil data kemudian pihak client bisa menyunting nama dan kategori. 

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
![](https://github.com/widyantarif/Tugas-UAS-6026222009-Pengembangan-dan-Penerapan-Sistem/blob/main/Dokumentasi%20Tugas%20EAS/postman%20update-user.JPG)

__Source Code lengkap:__ [disini](https://github.com/widyantarif/Tugas-UAS-6026222009-Pengembangan-dan-Penerapan-Sistem/blob/main/app.js)

## Pembuatan service menggunakan tampilan client

Berikut adalah gambaran sistem untuk client yang telah dibuat. 

1. Update Data Peserta
dengan menginputkan id yang terdaftar, bisa menyunting nama dan kategori. 

![](https://github.com/widyantarif/Tugas-UAS-6026222009-Pengembangan-dan-Penerapan-Sistem/blob/main/Dokumentasi%20Tugas%20EAS/update%20client.JPG)

2. Store Data Peserta
dengan menginputkan nama dan kategori untuk menambahkan data peserta khusus kategori beregu. 
![](https://github.com/widyantarif/Tugas-UAS-6026222009-Pengembangan-dan-Penerapan-Sistem/blob/main/Dokumentasi%20Tugas%20EAS/store%20client.JPG)

3. View Data Peserta
menampilkan data peserta yang telah tersimpan di database yang berisikan id, nama dan kategori. 
![](https://github.com/widyantarif/Tugas-UAS-6026222009-Pengembangan-dan-Penerapan-Sistem/blob/main/Dokumentasi%20Tugas%20EAS/view%20client.JPG)

4. Koneksi Antara service node.js dengan tampilan client
berikut adalah source code untuk koneksi antara service yang bernama _app.js_ dengan tampilan client yang telah dibuat yang menggunakan implemntasi html+css.

```
app.get('/js/bootstrap.min.js', (req, res) => {
    const filePath = join(__dirname, 'client/js/bootstrap.min.js');
    res.sendFile(filePath);
});

app.get('/js/jquery.min.js', (req, res) => {
    const filePath = join(__dirname, 'client/js/jquery.min.js');
    res.sendFile(filePath);
});

app.get('/js/popper.js', (req, res) => {
    const filePath = join(__dirname, 'client/js/popper.js');
    res.sendFile(filePath);
});


app.get('/css/style.css', (req, res) => {
    const filePath = join(__dirname, 'client/css/style.css');
    res.sendFile(filePath);
});

app.get('/css/bootstrap.min.css', (req, res) => {
    const filePath = join(__dirname, 'client/css/bootstrap.min.css');
    res.sendFile(filePath);
});

app.get('/images/logo.jpg', (req, res) => {
    const filePath = join(__dirname, 'client/images/logo.jpg');
    res.sendFile(filePath);
});

app.get('/', (req, res) => {
    const filePath = join(__dirname, 'client/view.html');
    res.sendFile(filePath);
});

app.get('/store', (req, res) => {
    const filePath = join(__dirname, 'client/store.html');
    res.sendFile(filePath);
});

app.get('/update', (req, res) => {
    const filePath = join(__dirname, 'client/update.html');
    res.sendFile(filePath);
});

app.get('/view', (req, res) => {
    const filePath = join(__dirname, 'client/view.html');
    res.sendFile(filePath);
});

app.get('/payment', (req, res) => {
    const filePath = join(__dirname, 'client/payment.html');
    res.sendFile(filePath);
```

__Source Code lengkap:__ [disini](https://github.com/widyantarif/Tugas-UAS-6026222009-Pengembangan-dan-Penerapan-Sistem/tree/main/client)
__Source Code lengkap app.js:__ [disini](https://github.com/widyantarif/Tugas-UAS-6026222009-Pengembangan-dan-Penerapan-Sistem/blob/main/app.js)



