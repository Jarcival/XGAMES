import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

   imagenes = [
    './imgs/img1.jpg',
    './imgs/img2.jpeg',
    './imgs/img3.jpg'
  ];

  index = 0;

  siguiente() {
    this.index = (this.index + 1) % this.imagenes.length;
  }

  anterior() {
    this.index = (this.index - 1 + this.imagenes.length) % this.imagenes.length;
  }
// AQUÍ SIMULAMOS UNA BASE DE DATOS DE PRODUCTOS(CHINOOOOOOOOOOOOOOOOOOOOOOO)
  productos = [
    { id: 1, nombre: 'FIFA 24', precio: 1200, disponible: true },
    { id: 2, nombre: 'Call of Duty', precio: 1400, disponible: true },
    { id: 3, nombre: 'GTA V', precio: 900, disponible: false },
    { id: 4, nombre: 'Minecraft', precio: 600, disponible: true }
  ];

  // (simulación BD)
  get productosRandom() {
    return this.productos
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }
}