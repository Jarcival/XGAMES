import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {

  nombre: string = '';
  correo: string = '';
  asunto: string = '';
  mensaje: string = '';

  enviar() {
    if (this.nombre && this.correo && this.mensaje) {
      console.log({
        nombre: this.nombre,
        correo: this.correo,
        asunto: this.asunto,
        mensaje: this.mensaje
      });

      // limpiar formulario
      this.nombre = '';
      this.correo = '';
      this.asunto = '';
      this.mensaje = '';
    }
  }
}