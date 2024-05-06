import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Producto } from '../models/producto';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent {

  listProductos: Producto[] = [];
  listProductosOriginal: Producto[] = [];
  searchQuery: string = '';
  sugerenciasProductos: Producto[] = [];
  sugerenciasEnTiempoReal: Producto[] = [];

  private routesMap = new Map([
    ['login', '/login'],
    ['inicio de sesión', '/login'],
    ['carrito', '/cart'],
    ['agregar','/agregar'],
    ['informacion','/info'],
    ['inicio',''],

  ]);

  constructor( private router: Router,) { }

  buscarProductos(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.sugerenciasProductos = []; // Reiniciar las sugerencias

    // Verifica si la consulta coincide con una ruta
    for (const [keyword, path] of this.routesMap.entries()) {
      if (query.includes(keyword)) {
        // Si la consulta contiene la palabra clave, navega a la ruta correspondiente
        if (path.includes(':')) {
          // Si la ruta tiene un parámetro, pide al usuario que lo ingrese
          const param = prompt(
            `Ingresa el valor del parámetro para ${keyword}`
          );
          if (param) {
            this.router.navigateByUrl(path.replace(':id', param));
          }
        } else {
          this.router.navigateByUrl(path);
        }
        return; 
      }
    }

    if (query === '') {
      // Si la consulta está vacía, restablecer los filtros
    } else {
      // Filtrar productos por nombre o categoría que coincidan con la consulta
      const resultados = this.listProductosOriginal.filter((producto) => {
        return (
          producto.nombre.toLowerCase().includes(query) ||
          producto.categoria.toLowerCase().includes(query)
        );
      });

      if (resultados.length === 0) {
        // No se encontraron resultados, redirigir a la página de error
        this.router.navigate(['/error']);
      } else {
        // Mostrar los resultados en la lista
        this.listProductos = resultados;

        // Obtener sugerencias de productos relacionados
        this.sugerenciasProductos = resultados.slice(0, 5); // Tomar los primeros 5 resultados
      }
    }
  }

  navigateToProductDetails(productoNombre: string): void {
    // Buscar el producto en listProductosOriginal por su nombre
    const producto = this.listProductosOriginal.find(p => p.nombre === productoNombre);
  
    // Si se encuentra el producto, navegar a sus detalles
    if (producto) {
      this.router.navigate(['/product-detail', producto._id]);
    }
  }
  actualizarSugerencias(query: string): void {
    this.sugerenciasEnTiempoReal = this.listProductosOriginal.filter(producto => {
      const nombre = producto.nombre ? producto.nombre.toLowerCase() : '';
      return nombre.includes(query.toLowerCase());
    });
  }
}
