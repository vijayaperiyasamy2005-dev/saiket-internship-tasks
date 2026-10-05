const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

let users = [
    {
        id: 1,
        name: "Vijaya",
        email: "vijaya@gmail.com",
        age: 21
    }
];


app.get("/", (req, res) => {
    res.send("User REST API is running!");
});


app.get("/users", (req, res) => {
    res.json(users);
});


app.get("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});


app.post("/users", (req, res) => {

    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    };

    users.push(newUser);

    res.status(201).json(newUser);
});


app.put("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.age = req.body.age;

    res.json(user);
});


app.delete("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const userExists = users.some(user => user.id === id);

    if (!userExists) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users = users.filter(user => user.id !== id);

    res.json({
        message: "User deleted successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});