// product-register.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent {
  nombre: string = '';
  detalles: string = '';
  tallas: string[] = [];
  precio: number = 0;
  categoria: string = '';
  imagen: File | null = null; // Cambiado a tipo File

  constructor(private http: HttpClient, private sanatizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  registrarProducto(): void {
    const formData = new FormData(); // Usar FormData para enviar archivos

    // Agregar datos del producto al FormData
    formData.append('nombre', this.nombre);
    formData.append('detalles', this.detalles);
    formData.append('tallas', JSON.stringify(this.tallas)); // Convertir a cadena JSON
    formData.append('precio', this.precio.toString());
    formData.append('categoria', this.categoria);
    if (this.imagen) {
      formData.append('imagen', this.imagen, this.imagen.name); // Agregar la imagen al FormData
    }

    // Enviar el FormData al servidor
    this.http.post<any>('http://localhost:4000/api/productos', formData)
      .subscribe(
        (data) => {
          console.log('Producto registrado:', data);
          alert('Producto registrado exitosamente');
        },
        (error) => {
          console.error('Error al registrar el producto:', error);
          alert('Hubo un error al registrar el producto');
        }
      );
  }

  onFileSelected(event: any): void {
    // Capturar el archivo seleccionado
    console.log('Archivo seleccionado:', event.target.files[0]);
    this.imagen = event.target.files[0];
  }
}
