import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../core/services/producto';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit, OnDestroy {

   imagenes = [
    './imgs/img1.jpg',
    './imgs/img2.jpeg',
    './imgs/img3.jpg'
  ];

  index = 0;
  intervalId: any;
  productos = signal<any[]>([]);

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.startCarousel();
    this.productoService.getProductos().subscribe({
      next: (datos: any[]) => {
        // Tomamos los 4 primeros productos para "Lo más vendido"
        this.productos.set(datos.slice(0, 4));
      },
      error: (err) => console.error('Error al cargar productos de inicio', err)
    });
  }

  ngOnDestroy() {
    this.clearCarousel();
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.siguiente();
    }, 5000);
  }

  clearCarousel() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  pause() {
    this.clearCarousel();
  }

  resume() {
    this.startCarousel();
  }

  setIndex(i: number) {
    this.index = i;
  }

  siguiente() {
    this.index = (this.index + 1) % this.imagenes.length;
  }

  anterior() {
    this.index = (this.index - 1 + this.imagenes.length) % this.imagenes.length;
  }
}