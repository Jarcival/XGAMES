CREATE DATABASE IF NOT EXISTS tienda_videojuegos;
USE tienda_videojuegos;


CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    marca VARCHAR(50),
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    imagen VARCHAR(255),
    descripcion TEXT,
    disponible BOOLEAN DEFAULT TRUE
);

-- Tabla mensajes
CREATE TABLE mensajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    asunto VARCHAR(150),
    mensaje TEXT NOT NULL
);
- Insertar datos para calar en el frontend
INSERT INTO productos (nombre, categoria, marca, precio, stock, imagen, descripcion, disponible) 
VALUES 
('Red Dead Redemption 2', 'Mundo Abierto', 'Rockstar Games', 1199.00, 15, 'https://ejemplo.com/rdr2.jpg', 'Épica historia de supervivencia en el salvaje oeste, sigue a Arthur Morgan y la banda de Van der Linde.', TRUE),
('The Legend of Zelda: Tears of the Kingdom', 'Aventura', 'Nintendo', 1399.00, 8, 'https://ejemplo.com/zelda.jpg', 'Explora las tierras y los cielos de Hyrule en esta aventura sin límites.', TRUE),
('Elden Ring', 'RPG de Acción', 'FromSoftware', 999.00, 20, 'https://ejemplo.com/elden.jpg', 'Levántate, Sinluz, y déjate guiar por la gracia para esgrimir el poder del Círculo de Elden.', TRUE);

-- Insertar un mensaje de prueba
INSERT INTO mensajes (nombre, correo, asunto, mensaje)
VALUES
('Cliente de prueba', 'cliente@correo.com', 'Duda sobre stock', '¿Cuándo tendrán más copias de RDR2 disponibles?');