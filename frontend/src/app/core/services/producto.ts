import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/productos'; // La ruta de tu backend

  constructor(private http: HttpClient) { }

  // Método que tu componente Catálogo va a llamar
  getProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}