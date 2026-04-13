import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
//CHINOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
  productos = [
    { id: 1, nombre: 'FIFA 24', precio: 1200, imagen: '/imgs/user1.jpeg', disponible: true },
    { id: 2, nombre: 'Call of Duty', precio: 1400, imagen: 'assets/cod.jpg', disponible: false },
    { id: 3, nombre: 'GTA V', precio: 900, imagen: 'assets/gta.jpg', disponible: true },
    { id: 4, nombre: 'Minecraft', precio: 600, imagen: 'assets/minecraft.jpg', disponible: true },
    { id: 5, nombre: 'Minecraft', precio: 600, imagen: 'assets/minecraft.jpg', disponible: true },
    { id: 6, nombre: 'Minecraft', precio: 600, imagen: 'assets/minecraft.jpg', disponible: true }
  ];
}