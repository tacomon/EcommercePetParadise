import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent {
  nombre: string = '';
  precio: number = 0;
  detalles: string = '';
  talla: string = '';
  categoria: string = '';

  constructor(private http: HttpClient) { }

  registrarProducto() {
    const producto = {
      nombre: this.nombre,
      precio: this.precio,
      detalles: this.detalles,
      talla: this.talla,
      categoria: this.categoria
    };

    this.http.post<any>('http://localhost:4000/api/productos', producto)
      .subscribe(
        (response) => {
          console.log('Producto registrado exitosamente:', response);
          // Aquí puedes agregar lógica adicional, como redireccionar a otra página o mostrar un mensaje de éxito
        },
        (error) => {
          console.error('Error al registrar el producto:', error);
          // Aquí puedes manejar el error, como mostrar un mensaje al usuario
        }
      );
  }
}
