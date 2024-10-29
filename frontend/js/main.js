// Gọi API và hiển thị danh sách sản phẩm
fetch('http://localhost:3000/update-products')
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Xóa danh sách cũ nếu có

        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `Tên: ${product.name}, Giá: ${product.price}, Kích thước: ${product.size}, Loại: ${product.type}`;
            productList.appendChild(li);
        });
    })
    .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
