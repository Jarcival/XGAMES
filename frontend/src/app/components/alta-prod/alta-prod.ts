import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductoService } from '../../core/services/producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-prod',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alta-prod.html',
  styleUrl: './alta-prod.css',
})
export class AltaProd {

  guardando = false;

  form = new FormGroup({
    nombre:      new FormControl('', Validators.required),
    categoria:   new FormControl('', Validators.required),
    marca:       new FormControl('', Validators.required),
    precio:      new FormControl('', [Validators.required, Validators.min(1)]),
    stock:       new FormControl('', [Validators.required, Validators.min(0)]),
    imagen:      new FormControl(''),
    descripcion: new FormControl('', Validators.required),
    disponible:  new FormControl(true)
  });

  constructor(private productoService: ProductoService) {}

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando = true;

    this.productoService.crearProducto(this.form.value).subscribe({
      next: () => {
        this.guardando = false;
        this.form.reset({ disponible: true });

        Swal.fire({
          icon: 'success',
          title: '¡Producto guardado!',
          text: 'El producto fue agregado al catálogo correctamente.',
          confirmButtonColor: '#22c55e',
          background: '#1e293b',
          color: '#e2e8f0'
        });
      },
      error: (err) => {
        this.guardando = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err?.error?.error || 'No se pudo guardar el producto.',
          confirmButtonColor: '#ef4444',
          background: '#1e293b',
          color: '#e2e8f0'
        });
      }
    });
  }
}
