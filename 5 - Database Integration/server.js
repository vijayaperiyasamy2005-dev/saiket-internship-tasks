const express = require("express");
const db = require("./db");

const app = express();

const PORT = 3001;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Task 5 API is running!");
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
            id: result.insertId,
            name: name,
            email: email,
            age: age
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

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
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

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully"
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});