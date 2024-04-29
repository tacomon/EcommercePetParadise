import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false; // Agregar esta propiedad

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
    // Verificar la expiración del token cada minuto
    setInterval(() => {
      this.checkTokenExpiration();
    }, 60000);
  }
  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('http://localhost:4000/api/auth/login', { email, password })
      .pipe(
        map(response => {
          localStorage.setItem('token', response.token);
          this.isAuthenticated = true; // Establecer isAuthenticated a true después de un inicio de sesión exitoso
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated = false; // Establecer isAuthenticated a false después del cierre de sesión
  }
  

  getUsuarioRol(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.usuario.rol;
  }
  
  getTokenExpiration(): Date | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    const decodedToken: any = jwtDecode(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    return expirationDate;
  }

  private checkTokenExpiration(): void {
    const expirationDate = this.getTokenExpiration();
    if (expirationDate && new Date() > expirationDate) {
      // El token ha expirado
      this.logout();
      this.toastr.info('Su sesión ha caducado. Por favor, inicie sesión nuevamente.', 'Sesión expirada');
      this.router.navigate(['/login']);
      // Redirigir al usuario a la página de inicio de sesión
    }
  }


  
}
