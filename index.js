const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let users = [
    { id: 1, nombre: "Alberto", apellidos: "Robles Morales", dni: "78558458", fecha_nacimiento: "12/12/2000" },
    { id: 2, nombre: "Juan", apellidos: "Robles Morales", dni: "82558458", fecha_nacimiento: "12/12/2000" },
    { id: 3, nombre: "Ana", apellidos: "Robles Morales", dni: "43558458", fecha_nacimiento: "12/12/2000" },
];

// ROOT
app.get("/", (req, res) => {
    res.json({ message: "servidor funcionando" });
});

// GET USERS
app.get("/users", (req, res) => {
    res.json(users);
});

// POST USER
app.post("/users", (req, res) => {
    let new_user = {
        id: users.length + 1,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        dni: req.body.dni,
        fecha_nacimiento: req.body.fecha_nacimiento
    };

    users.push(new_user);
    res.status(201).json(new_user);
});

// PUT USER
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    users[index] = { ...users[index], ...req.body };

    res.json({ message: "Usuario actualizado", user: users[index] });
});

// DELETE USER
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const deleted = users.splice(index, 1);

    res.json({ message: "Usuario eliminado", user: deleted[0] });
});

// SERVER
app.listen(port, () => {
    console.log("Servidor escuchando en puerto", port);
});
