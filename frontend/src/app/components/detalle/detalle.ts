import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle {

  producto: any;

  productos = [
    { id: 1, nombre: 'FIFA 24', precio: 1200, imagen: '/imgs/user1.jpeg', descripcion: 'Juego de fútbol realista', disponible: true },
    { id: 2, nombre: 'Call of Duty', precio: 1400, imagen: 'assets/cod.jpg', descripcion: 'Juego de disparos', disponible: false },
    { id: 3, nombre: 'GTA V', precio: 900, imagen: 'assets/gta.jpg', descripcion: 'Mundo abierto', disponible: true },
    { id: 4, nombre: 'Minecraft', precio: 600, imagen: 'assets/minecraft.jpg', descripcion: 'Creatividad sin límites', disponible: true }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.producto = this.productos.find(p => p.id === id);
  }
}