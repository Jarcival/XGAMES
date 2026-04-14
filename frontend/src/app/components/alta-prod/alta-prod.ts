import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-alta-prod',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alta-prod.html',
  styleUrl: './alta-prod.css',
})
export class AltaProd {

  form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    precio: new FormControl('', [Validators.required, Validators.min(1)]),
    stock: new FormControl('', [Validators.required, Validators.min(0)]),
    imagen: new FormControl(''),
    descripcion: new FormControl('', Validators.required),
    disponible: new FormControl(true)
  });

  //chinoooooooooooooooooooooooooooooooooooooooooooo
  guardar() {
    if (this.form.valid) {
      console.log('Producto:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}