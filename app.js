const express = require('express')
const app = express()
const conn = require('./config/db')
const {join} = require("path");

app.use(express.json())

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
});


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
        });
      }
    });
  })
  
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
        });
      }
    })
  })

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
        });
      }
    })
  })


app.listen(3000);