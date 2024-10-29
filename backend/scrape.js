const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// URL của trang Đăng Quang Watch
const url = 'https://www.dangquangwatch.vn/dong-ho.html';

async function scrapeData() {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const products = [];

        $('.info').each((index, element) => {
            const name = $(element).find('.name').text().trim();
            const price = $(element).find('.price').text().trim();
            const size = $(element).find('.price').text().trim();
            const type = $(element).find('.name').text().trim();

            products.push({ name, price, size, type });
        });

        const csvContent = products.map(p => `${p.name},${p.price},${p.size},${p.type}`).join('\n');
        const filePath = path.join(__dirname, 'csv', 'products.csv');

        fs.writeFileSync(filePath, csvContent);
        console.log('Dữ liệu đã được lưu thành CSV.');
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
    }
}

scrapeData();
