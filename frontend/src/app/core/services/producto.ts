import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/productos'; // La ruta de tu backend que se cambiara en el despliegue

  // API Key gratuita de RAWG para videojuegos
  private rawgApiKey = '2b834b3e996e4147b42a06ad899b6806';

  constructor(private http: HttpClient) { }

  // Método que tu componente Catálogo va a llamar
  getProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getProducto(id: string | number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  crearProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  checkout(items: any[]): Observable<any> {
    // La ruta de checkout
    return this.http.put('http://localhost:3000/checkout', items);
  }

  // NUEVO: Busca el juego en RAWG por su nombre
  getExtraInfoRAWG(nombreJuego: string): Observable<any> {
    // RAWG busca los juegos por texto y nos devuelve coincidencias
    return this.http.get(`https://api.rawg.io/api/games?key=${this.rawgApiKey}&search=${nombreJuego}`);
  }
}