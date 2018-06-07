DROP DATABASE IF EXISTS playlistDB;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "T-Shirt", "Clothing", 10, 5);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (77, "Leather Sandals", "Shoes", 40, 7);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "Floral Scarf", "Clothing", 15, 8);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (16, "Teapot", "Kitchen", 25, 9);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "Sunglasses", "Accessories", 30, 12);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (44, "Plaid Flannel Shirt", "Clothing", 25, 10);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (30, "Bluetooth Speaker", "Electronics", 30, 9);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (82, "Analog Watch", "Accessories", 20, 11);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (71, "Harry Potter DVD Set", "Movies", 40, 5);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (39, "Tent", "Outdoor Gear", 40, 3);