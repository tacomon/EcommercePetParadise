import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const token = this.authService.getToken(); // Obtener el token del servicio AuthService
    if (!token) {
      // Si no hay token, redireccionar al usuario a la página de inicio de sesión
      return of(this.router.createUrlTree(['/login']));
    }

    return this.authService.validateToken(token).pipe(
      map(response => {
        if (response.isValid && response.rol === 'administrador') {
          return true; // Permitir el acceso si el token es válido y el usuario es administrador
        } else {
          // Redireccionar a la página de inicio de sesión si el token no es válido o el usuario no es administrador
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
