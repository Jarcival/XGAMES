import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactoService } from '../../core/services/contacto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
  datosContacto = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  };

  enviando = false;

  constructor(private contactoService: ContactoService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.enviando = true;

    this.contactoService.enviarMensaje(this.datosContacto).subscribe({
      next: () => {
        this.enviando = false;
        form.resetForm();
        this.datosContacto = { nombre: '', correo: '', asunto: '', mensaje: '' };

        Swal.fire({
          icon: 'success',
          title: '¡Mensaje enviado!',
          text: 'Nos pondremos en contacto contigo pronto.',
          confirmButtonColor: '#22c55e',
          background: '#1e293b',
          color: '#e2e8f0'
        });
      },
      error: () => {
        this.enviando = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo enviar el mensaje. Intenta de nuevo.',
          confirmButtonColor: '#ef4444',
          background: '#1e293b',
          color: '#e2e8f0'
        });
      }
    });
  }
}
