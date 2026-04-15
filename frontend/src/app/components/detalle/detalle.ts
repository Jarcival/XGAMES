import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductoService } from '../../core/services/producto'; // <-- Importamos el servicio

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle implements OnInit {
  // Usamos signal igual que en el catálogo para evitar problemas de repintado
  producto = signal<any>(null);

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService // <-- Inyectamos el servicio
  ) {}

  ngOnInit() {
    // 1. Obtenemos el ID de la URL
    const id = this.route.snapshot.paramMap.get('id');

    // 2. Si hay un ID, vamos al backend a buscar el juego
    if (id) {
      this.productoService.getProducto(id).subscribe({
        next: (datos) => {
          this.producto.set(datos); // Guardamos la info de la BD
          console.log('Detalle cargado:', this.producto());
        },
        error: (err) => console.error('Error al cargar el detalle', err)
      });
    }
  }
}