import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrl = 'https://xgames-production.up.railway.app/mensajes'; // La ruta POST que hicimos en Node

  constructor(private http: HttpClient) { }

  enviarMensaje(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }
} 