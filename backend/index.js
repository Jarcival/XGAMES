const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors()); // Permite peticiones desde tu app de Angular [cite: 188]
app.use(express.json()); // Parsea el body de las peticiones a JSON

// ==========================================
// MIDDLEWARES DE VALIDACIÓN 
// ==========================================

const validarProducto = (req, res, next) => {
    const { nombre, precio, stock } = req.body;

    // Validación de campos vacíos [cite: 199]
    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ error: 'El nombre del producto es obligatorio.' });
    }
    // Validación de precio [cite: 200]
    if (precio === undefined || isNaN(precio) || precio <= 0) {
        return res.status(400).json({ error: 'El precio debe ser un número mayor a 0.' });
    }
    // Validación de stock [cite: 201]
    if (stock === undefined || isNaN(stock) || stock < 0) {
        return res.status(400).json({ error: 'El stock no puede ser un valor negativo.' });
    }

    next(); // Si todo está bien, continúa al endpoint
};

const validarMensaje = (req, res, next) => {
    const { nombre, correo, asunto, mensaje } = req.body;
    
    // Validación de mensaje de contacto [cite: 202]
    if (!nombre || !correo || !asunto || !mensaje) {
        return res.status(400).json({ error: 'Todos los campos del contacto son obligatorios.' });
    }
    next();
};

// ==========================================
// ENDPOINTS 
// ==========================================

// GET /productos (listar) [cite: 192]
app.get('/productos', (req, res) => {
    // TODO: Ejecutar query 'SELECT * FROM productos'
    res.json({ mensaje: 'Aquí se listarán todos los productos' });
});

// GET /productos/:id (detalle) [cite: 193]
app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    // TODO: Ejecutar query 'SELECT * FROM productos WHERE id = ?'
    res.json({ mensaje: `Detalle del producto con ID: ${id}` });
});

// POST /productos (alta) [cite: 194] - Usa el middleware de validación
app.post('/productos', validarProducto, (req, res) => {
    const { nombre, categoria, marca, precio, stock, imagen, descripcion, disponible } = req.body;
    // TODO: Ejecutar query 'INSERT INTO productos...'
    res.status(201).json({ 
        mensaje: 'Producto agregado exitosamente',
        producto: req.body 
    });
});

// POST /mensajes (guardar contacto) [cite: 195] - Usa el middleware de validación
app.post('/mensajes', validarMensaje, (req, res) => {
    const { nombre, correo, asunto, mensaje } = req.body;
    // TODO: Ejecutar query 'INSERT INTO mensajes...'
    res.status(201).json({ 
        mensaje: 'Mensaje de contacto guardado exitosamente' 
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});