import { Component, OnInit, signal } from '@angular/core'; // <-- Agregamos signal aquí
import { ProductoService } from '../../core/services/producto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (datos: any[]) => {
        // 2. Usamos .set() para inyectar los datos y "avisarle" a la pantalla
        this.juegos.set(datos);
        console.log('Juegos cargados en el Signal:', this.juegos());
      },
      error: (err: any) => console.error('Error al cargar productos', err)
    });
  }
}