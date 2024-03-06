import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { CartItem } from '../models/cartItem';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  listProductos: Producto[] = [];
  totalPages: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 20;
  searchQuery: string = '';
  categoriasUnicas: string[] = [];
  tallasUnicas: string[] = [];
  listProductosOriginal: Producto[] = [];

  constructor(private _productoService: ProductoService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.obtenerProductos(this.currentPage, this.itemsPerPage);
    this.obtenerProductosUnicos();
  }



  // Restaurar la lista de productos originales cuando se agregue un producto al carrito
  addToCart(producto: Producto): void {
    this._productoService.addToCart(producto);
    this.toastr.success('Se agregó al carrito!', 'Producto agregado!');
    this.listProductosOriginal = this.listProductos.slice();
  }

  obtenerProductos(page: number, itemsPerPage: number): void {
    this._productoService.getProductos(page, itemsPerPage).subscribe(data => {
      console.log("Datos de la API:", data);
      this.listProductos = data.products;
      this.totalPages = data.totalPages;
      this.currentPage = page;

      this.categoriasUnicas = this.obtenerCategoriasUnicas(this.listProductos);
      this.obtenerProductosUnicos();
      this.listProductosOriginal = this.listProductos.slice(); // Guardar copia de la lista original
    }, error => {
      console.log(error);
    });
  }

  private obtenerCategoriasUnicas(productos: Producto[]): string[] {
    const categoriasSet = new Set<string>();
    productos.forEach(producto => {
      categoriasSet.add(producto.categoria);
    });
    return Array.from(categoriasSet);
  }

  obtenerProductosUnicos(): void {
    if (this.listProductos && this.listProductos.length > 0) {
      const tallasSet = new Set<number>();

      this.listProductos.forEach((producto) => {
        if (producto.tallas) {
          producto.tallas.forEach((talla) => {
            tallasSet.add(talla);
          });
        }
      });

      this.tallasUnicas = Array.from(tallasSet).map((talla) => talla.toString());
    } else {
      this.tallasUnicas = [];
    }
  }

  agregarAlCarrito(producto: Producto): void {
    this._productoService.addToCart(producto);
  }

  changePage(page: number): void {
    this.obtenerProductos(page, this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  filtrarPorCategoria(categoria: string): void {
    this.listProductos = this.listProductosOriginal.filter(producto => producto.categoria === categoria);
  }
  filtrarPorTalla(talla: string): void {
    // Restablecer los filtros previos

    // Filtrar los productos que contienen la talla seleccionada en su lista de tallas
    this.listProductos = this.listProductos.filter((producto) => {
      return producto.tallas && producto.tallas.includes(parseInt(talla));
    });
  }
  buscarProductos(): void {
    if (this.searchQuery.trim() === '') {
      // Si la consulta está vacía, restablecer los filtros
  
    } else {
      // Filtrar productos por nombre o categoría que coincidan con la consulta
      const query = this.searchQuery.toLowerCase().trim();
      this.listProductos = this.listProductosOriginal.filter((producto) => {
        return (
          producto.nombre.toLowerCase().includes(query) ||
          producto.categoria.toLowerCase().includes(query)
        );
      });
    }
  }
  
}