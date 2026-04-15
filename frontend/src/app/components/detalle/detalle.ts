import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductoService } from '../../core/services/producto';
import { CarritoService } from '../../core/services/carrito';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle implements OnInit {
  producto = signal<any>(null);

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productoService.getProducto(id).subscribe({
        next: (datos) => {
          this.producto.set(datos);
        },
        error: (err) => console.error('Error al cargar el detalle', err)
      });
    }
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