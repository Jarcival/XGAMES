import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../core/services/carrito';
import { ProductoService } from '../../core/services/producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  public items: any;
  public total: any;
  procesando = false;

  constructor(
    public carritoService: CarritoService,
    private productoService: ProductoService
  ) {
    this.items = this.carritoService.items;
    this.total = computed(() => {
      return this.items().reduce((acc: any, current: any) => acc + (current.precio * current.cantidad), 0);
    });
  }

  quitar(id: number) {
    this.carritoService.removeCart(id);
  }

  pagar() {
    if (this.items().length === 0) return;
    
    this.procesando = true;
    
    // Preparar el arreglo de items { id, cantidad } conforme al backend plan
    const payload = this.items().map((item: any) => ({
      id: item.id,
      cantidad: item.cantidad
    }));

    this.productoService.checkout(payload).subscribe({
      next: (res) => {
        this.procesando = false;
        this.carritoService.clearCart();
        
        Swal.fire({
          icon: 'success',
          title: '¡Pago Exitoso!',
          text: 'Tu pedido ha sido procesado ficticiamente.',
          confirmButtonText: 'Entendido',
          background: '#18181b',
          color: '#06b6d4'
        });
      },
      error: (err) => {
        this.procesando = false;
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar el pago.',
          background: '#18181b',
          color: '#ef4444'
        });
      }
    });
  }
}
