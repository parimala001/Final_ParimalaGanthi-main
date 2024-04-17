const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'shopping_web'
});

// Define a route to serve images
app.get('/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    // Assuming your images are stored in the public/images directory
    const imagePath = path.join(__dirname, 'public', 'images', imageName);
    res.sendFile(imagePath);
});

app.get('/', (req, res) => {
    return res.json("From Backend...");
});

app.get('/product', (req, res) => {
    const sql = "SELECT * FROM product";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.get('/cart', (req, res) => {
    const sql = "SELECT * FROM cart";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching cart items:", err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.post('/cart', (req, res) => {
    const { product_name, quantity } = req.body;

    if (!product_name || !quantity) {
        return res.status(400).json({ error: 'Invalid request. Product name or quantity is missing in the request body' });
    }

    const sql = "INSERT INTO cart (products, quantities) VALUES (?, ?)";
    db.query(sql, [product_name, quantity], (err, result) => {
        if (err) {
            console.error("Error adding product to cart:", err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log("Product added to cart:", product_name);
        return res.status(200).json({ message: 'Product added to cart successfully' });
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
