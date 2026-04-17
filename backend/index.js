const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path'); //PARA HACER PUBLICA LA CARPETA DE LAS IMNGS
require('dotenv').config();
//final

const app = express();

app.use(cors());
app.use(express.json()); 
app.use('/public', express.static(path.join(__dirname, 'public')));//IMGS
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// Configuración de la BD 
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root', 
    password: process.env.DB_PASSWORD || '', 
    database: process.env.DB_NAME || 'tienda_videojuegos'
});

// 1. MIDDLEWARES DE VALIDACIÓN

// Valida que el producto traiga todo y los números sean lógicos
const validarProducto = (req, res, next) => {
    const { nombre, categoria, marca, precio, stock, imagen } = req.body;

    if (!nombre || !categoria || !marca || !imagen) {
        return res.status(400).json({ error: 'Faltan campos obligatorios de texto.' });
    }
    if (precio === undefined || isNaN(precio) || precio <= 0) {
        return res.status(400).json({ error: 'El precio debe ser un número mayor a 0.' });
    }
    if (stock === undefined || isNaN(stock) || stock < 0) {
        return res.status(400).json({ error: 'El stock no puede ser negativo.' });
    }
    
    next(); // Si todo está bien, "lo deja pasar" al endpoint
};

// Valida que el mensaje de contacto no venga vacío
const validarMensaje = (req, res, next) => {
    const { nombre, correo, asunto, mensaje } = req.body;

    if (!nombre || !correo || !asunto || !mensaje) {
        return res.status(400).json({ error: 'Todos los campos del contacto son obligatorios.' });
    }
    
    next();
};

// 2. ENDPOINTS (RUTAS)

// GET /productos (Listar todos)
app.get('/productos', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// GET /productos/:id (Detalle de un solo producto)
app.get('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.execute('SELECT * FROM productos WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(rows[0]); // Mandamos solo el objeto, no un arreglo
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el detalle del producto' });
    }
});

// POST /productos (Alta de producto) -> Usamos el middleware "validarProducto"
app.post('/productos', validarProducto, async (req, res) => {
    try {
        const { nombre, categoria, marca, precio, stock, imagen, descripcion } = req.body;
        const query = `INSERT INTO productos (nombre, categoria, marca, precio, stock, imagen, descripcion, disponible) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        // Si el stock es 0, lo marcamos como no disponible (0), si es mayor, disponible (1)
        const disponible = stock > 0 ? 1 : 0; 

        const [resultado] = await db.execute(query, [nombre, categoria, marca, precio, stock, imagen, descripcion || '', disponible]);
        
        res.status(201).json({ mensaje: 'Producto creado exitosamente', id: resultado.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar el producto' });
    }
});

// POST /mensajes (Guardar contacto) -> Usamos el middleware "validarMensaje"
app.post('/mensajes', validarMensaje, async (req, res) => {
    try {
        const { nombre, correo, asunto, mensaje } = req.body;
        const query = 'INSERT INTO mensajes (nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)';
        
        await db.execute(query, [nombre, correo, asunto, mensaje]);
        
        res.status(201).json({ mensaje: 'Mensaje de contacto enviado y guardado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar el mensaje' });
    }
});

// PUT /checkout (Realizar compra)
app.put('/checkout', async (req, res) => {
    try {
        const items = req.body;
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'El carrito está vacío' });
        }

        for (const item of items) {
            const query = `
                UPDATE productos 
                SET stock = GREATEST(stock - ?, 0), 
                    disponible = IF(stock - ? > 0, 1, 0) 
                WHERE id = ?`;
            await db.execute(query, [item.cantidad, item.cantidad, item.id]);
        }

        res.status(200).json({ mensaje: 'Compra realizada comprobada y stock reducido correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la compra' });
    }
});

// ==========================================
// 3. INICIAR SERVIDOR
// ==========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => { 
    console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});