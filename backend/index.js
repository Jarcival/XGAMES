const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

// Middleware obligatorio
app.use(cors()); // Permite peticiones desde Angular
app.use(express.json()); // Permite recibir datos en formato JSON

// Configuración de tu BD (Ajusta el usuario y contraseña según tu XAMPP)
const dbConfig = {
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'tienda_videojuegos'
};

// ENDPOINT 1: Obtener todos los productos (Para el Catálogo)
app.get('/productos', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM productos WHERE disponible = 1');
        await connection.end();
        res.json(rows); // Enviamos los datos a Angular
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al conectar a la base de datos' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});