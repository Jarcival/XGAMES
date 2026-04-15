import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  items = signal<any[]>([]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('cart_xgames');
      if (stored) {
        this.items.set(JSON.parse(stored));
      }
    }
  }

  addCart(producto: any) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.items.update(current => {
      // Validar si ya existe
      const existe = current.find(p => p.id === producto.id);
      let nuevoCarrito;
      if (existe) {
        nuevoCarrito = current.map(p => 
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        nuevoCarrito = [...current, { ...producto, cantidad: 1 }];
      }
      localStorage.setItem('cart_xgames', JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  }

  removeCart(id: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.items.update(current => {
      const nuevoCarrito = current.filter(p => p.id !== id);
      localStorage.setItem('cart_xgames', JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  }

  clearCart() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.items.set([]);
    localStorage.removeItem('cart_xgames');
  }
}
