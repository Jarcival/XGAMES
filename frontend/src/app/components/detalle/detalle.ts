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
  infoExtra = signal<any>(null); // Datos extra de RAWG (Punto Extra)

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

          // 2. Usamos el nombre del juego que llegó para buscar en RAWG
          this.buscarInfoAdicional(datos.nombre);
        },
        error: (err) => console.error('Error al cargar el detalle', err)
      });
    }
  }

  // Método para manejar la API Externa
  buscarInfoAdicional(nombreJuego: string) {
    this.productoService.getExtraInfoRAWG(nombreJuego).subscribe({
      next: (rawgData) => {
        // RAWG nos regresa un arreglo llamado 'results'. Tomamos el primero (el más exacto)
        if (rawgData.results && rawgData.results.length > 0) {
          this.infoExtra.set(rawgData.results[0]);
          console.log('RAWG cargado!', this.infoExtra());
        }
      },
      error: (err) => console.error('Error API RAWG:', err)
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