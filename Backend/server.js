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

app.get('/', (req, res) => {
    return res.json("From Backend...");
});

// User Registration Endpoint
app.post('/register', (req, res) => {
    const { email, password, username, shippingAddress } = req.body;

    // Check if the user already exists in the database
    const checkUserQuery = "SELECT * FROM user WHERE email = ?";
    db.query(checkUserQuery, [email], (err, results) => {
        if (err) {
            console.error("Error checking user existence:", err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            // User already exists, return error
            return res.status(400).json({ error: 'User already exists' });
        } else {
            // Insert new user into the database
            const insertUserQuery = "INSERT INTO user (email, password, username, shipping_adrss) VALUES (?, ?, ?, ?)";
            db.query(insertUserQuery, [email, password, username, shippingAddress], (err, result) => {
                if (err) {
                    console.error("Error registering user:", err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                console.log("User registered successfully");
                return res.status(201).json({ message: 'User registered successfully' });
            });
        }
    });
});


// User Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists in the database with the provided email and password
    const loginUserQuery = "SELECT * FROM user WHERE email = ? AND password = ?";
    db.query(loginUserQuery, [email, password], (err, results) => {
        if (err) {
            console.error("Error logging in:", err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            // User found, return user data
            const user = results[0];
            return res.status(200).json({ user });
        } else {
            // User not found or invalid credentials
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

// route to serve images
app.get('/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    // Assuming your images are stored in the public/images directory
    const imagePath = path.join(__dirname, 'public', 'images', imageName);
    res.sendFile(imagePath);
});



// products page Endpoint
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
    // Query the database to fetch all cart items
    const sql = "SELECT * FROM cart";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching cart items:", err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json({ cart: data });
    });
});

// to delete cart items
app.delete('/cart/:cartId', (req, res) => {
    const { cartId } = req.params;
    const sql = "DELETE FROM cart WHERE cart_id = ?";
    db.query(sql, [cartId], (err, result) => {
        if (err) {
            console.error("Error deleting item from cart:", err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log("Item deleted from cart:", cartId);
        return res.status(200).json({ message: 'Item deleted from cart successfully' });
    });
});


app.listen(8081, () => {
    console.log("Listening on port 8081");
});
