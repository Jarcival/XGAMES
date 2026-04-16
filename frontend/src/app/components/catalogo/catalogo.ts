import { Component, OnInit, signal } from '@angular/core'; 
import { ProductoService } from '../../core/services/producto';
import { CarritoService } from '../../core/services/carrito';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})

export class Catalogo implements OnInit {
  // 1. Convertimos el arreglo normal a un Signal Reactivo
  juegos = signal<any[]>([]);

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (datos: any[]) => {
        // 2. Usamos .set() para inyectar los datos y "avisarle" a la pantalla
        this.juegos.set(datos);
      },
      error: (err: any) => console.error('Error al cargar productos', err)
    });
  }

  agregarAlCarrito(producto: any) {
    this.carritoService.addCart(producto);
    Swal.fire({
      icon: 'success',
      title: '¡Añadido!',
      text: `${producto.nombre} se agregó a tu carrito`,
      timer: 1500,
      showConfirmButton: false,
      background: '#18181b',
      color: '#06b6d4'
    });
  }
}