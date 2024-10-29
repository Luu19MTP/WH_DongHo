CREATE DATABASE IF NOT EXISTS product_app;

USE product_app;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price VARCHAR(50),
    size VARCHAR(50),
    type VARCHAR(100)
);

CREATE TABLE data_control (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(50),
    status VARCHAR(20)
);
