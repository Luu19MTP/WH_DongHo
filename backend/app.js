const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const cors = require('cors');  // Import cors

const app = express();
const PORT = 3000;

// Kết nối MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'product_app'
});

db.connect(err => {
    if (err) throw err;
    console.log('Kết nối MySQL thành công.');
});

// Sử dụng CORS middleware
app.use(cors());
//API lấy danh sách sản phẩm
app.get('/update-products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Lỗi khi lấy dữ liệu từ MySQL' });
            return;
        }
        res.json(results); // Trả về dữ liệu dưới dạng JSON
    });
});

// Đọc CSV và cập nhật vào MySQL
app.get('/import-products', (req, res) => {
    const filePath = path.join(__dirname, 'csv', 'products.csv');
    const stream = fs.createReadStream(filePath);

    const products = [];
    const csvStream = csv
        .parse()
        .on('data', row => products.push(row))
        .on('end', () => {
            products.forEach(([name, price, size, type]) => {
                db.query(
                    'INSERT INTO products (name, price, size, type) VALUES (?, ?, ?, ?)',
                    [name, price, size, type],
                    (err) => {
                        if (err) throw err;
                    }
                );
            });

            db.query(
                'INSERT INTO data_control (task_name, status) VALUES (?, ?)',
                ['update_products', 'success'],
                (err) => {
                    if (err) throw err;
                    res.json({ message: 'Cập nhật thành công.' });
                }
            );
        });

    stream.pipe(csvStream);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));










// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors'); // Để xử lý lỗi CORS

// const app = express();
// const PORT = 3000;

// // Cấu hình MySQL
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '', // Thay thế bằng mật khẩu của bạn
//     database: 'product_app'
// });

// // Kết nối với MySQL
// db.connect(err => {
//     if (err) {
//         console.error('Lỗi kết nối MySQL:', err);
//         return;
//     }
//     console.log('Kết nối MySQL thành công.');
// });

// // Sử dụng CORS middleware
// app.use(cors());

// // API lấy danh sách sản phẩm
// app.get('/update-products', (req, res) => {
//     db.query('SELECT * FROM products', (err, results) => {
//         if (err) {
//             res.status(500).json({ error: 'Lỗi khi lấy dữ liệu từ MySQL' });
//             return;
//         }
//         res.json(results); // Trả về dữ liệu dưới dạng JSON
//     });
// });

// // Khởi động server
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));