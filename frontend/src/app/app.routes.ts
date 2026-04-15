import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Catalogo } from './components/catalogo/catalogo';
import { Detalle } from './components/detalle/detalle';
import { Carrito } from './components/carrito/carrito';
import { Contacto } from './components/contacto/contacto';
import { AltaProd } from './components/alta-prod/alta-prod';

export const routes: Routes = [
  { path: '', component: Inicio }, 
  { path: 'catalogo', component: Catalogo },
  { path: 'productos/:id', component: Detalle }, //la que es dinamica 
  { path: 'carrito', component: Carrito },
  { path: 'contacto', component: Contacto },
  { path: 'alta-prod', component: AltaProd }
];