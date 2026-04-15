import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrl = 'http://localhost:3000/mensajes'; // La ruta POST que hicimos en Node

  constructor(private http: HttpClient) { }

  enviarMensaje(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }
}