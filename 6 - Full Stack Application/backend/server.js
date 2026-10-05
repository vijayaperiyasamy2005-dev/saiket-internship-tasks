const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

const PORT = 3002;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Task 6 Full Stack API is running!");
});

app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);
    });
});

app.post("/users", (req, res) => {
    const { name, email, age } = req.body;

    const sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";

    db.query(sql, [name, email, age], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.status(201).json({
            message: "User added successfully",
            id: result.insertId
        });
    });
});

app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const { name, email, age } = req.body;

    const sql = "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?";

    db.query(sql, [name, email, age, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json({
            message: "User updated successfully"
        });
    });
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM users WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json({
            message: "User deleted successfully"
        });
    });
});

app.listen(PORT, () => {
    console.log(`Task 6 server running on http://localhost:${PORT}`);
});