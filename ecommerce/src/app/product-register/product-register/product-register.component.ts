import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';



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

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    public authService: AuthService 
  ) {}
  ngOnInit(): void {
      // Verifica si el usuario ya está autenticado al cargar el componente
    const token = localStorage.getItem('token');
    this.authService.isAuthenticated = !!token;
  }

  logout(): void {
    this.authService.logout();
    this.toastr.success('A salido de la sesion!', 'Sesion cerrada!');
    //  redirigir a la página de inicio o login después del cierre de sesión
    this.router.navigate(['/login']);
  }

  registrarProducto() {
    const producto = {
      nombre: this.nombre,
      precio: this.precio,
      detalles: this.detalles,
      talla: this.talla,
      categoria: this.categoria
    };
  
    this.http.post<any>('http://localhost:4000/api/productos/', producto)
      .subscribe(
        (response) => {
          console.log('Producto registrado exitosamente:', response);
          this.toastr.success('Se agregó al carrito!', 'Producto agregado!');
          this.limpiarCampos(); // Limpia los campos de registro después de agregar un producto
        },
        (error) => {
          console.error('Error al registrar el producto:', error);
          this.toastr.error('Ocurrió un problema', 'No se agregó el producto!');
        }
      );
  }
  
  limpiarCampos() {
    // Limpia los campos de registro
    this.nombre = '';
    this.precio = 0;
    this.detalles = '';
    this.talla = '';
    this.categoria = '';
  }
}
