const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Konfigurasi Koneksi Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Sesuaikan dengan user database kamu
  password: "", // Sesuaikan dengan password database kamu
  database: "inventory_aset",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Terhubung ke MySQL Database!");
});

// --- API ENDPOINTS ---

// 1. Ambil Data Inventory (Untuk Inventory.html)
app.get("/api/inventory", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// 2. Tambah Data Inventory (Untuk inventoryAdd.html)
app.post("/api/inventory", (req, res) => {
  const data = req.body;
  const sql =
    "INSERT INTO products (product_name, category, stock_quantity, price, description) VALUES (?, ?, ?, ?, ?)";
  const values = [
    data.itemName,
    data.itemCategory,
    data.itemQuantity,
    data.itemPrice,
    data.itemDescription,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Item berhasil ditambahkan!", id: result.insertId });
  });
});

// Jalankan Server
app.listen(3000, () => {
  console.log("Server berjalan di port 3000");
});
