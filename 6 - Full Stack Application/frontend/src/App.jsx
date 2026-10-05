import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [editId, setEditId] = useState(null);

    const getUsers = async () => {
        const response = await fetch("http://localhost:3002/users");
        const data = await response.json();
        setUsers(data);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const saveUser = async (e) => {
        e.preventDefault();

        const userData = {
            name: name,
            email: email,
            age: Number(age)
        };

        if (editId) {
            await fetch(`http://localhost:3002/users/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            setEditId(null);
        } else {
            await fetch("http://localhost:3002/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
        }

        setName("");
        setEmail("");
        setAge("");

        getUsers();
    };

    const editUser = (user) => {
        setEditId(user.id);
        setName(user.name);
        setEmail(user.email);
        setAge(user.age);
    };

    const deleteUser = async (id) => {
        await fetch(`http://localhost:3002/users/${id}`, {
            method: "DELETE"
        });

        getUsers();
    };

    return (
        <div className="container">
            <h1>User Management System</h1>

            <form onSubmit={saveUser}>
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Enter Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />

                <button type="submit">
                    {editId ? "Update User" : "Add User"}
                </button>
            </form>

            <h2>Users List</h2>

            {users.map((user) => (
                <div className="user-card" key={user.id}>
                    <h3>{user.name}</h3>
                    <p>Email: {user.email}</p>
                    <p>Age: {user.age}</p>

                    <button onClick={() => editUser(user)}>
                        Edit
                    </button>

                    <button onClick={() => deleteUser(user.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default App;