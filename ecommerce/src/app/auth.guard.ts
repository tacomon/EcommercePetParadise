import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAdmin = this.authService.getUsuarioRol() === 'administrador';

    if (this.authService.isAuthenticated && isAdmin) {
      return true; // Permite acceder a la ruta si el usuario está autenticado y es administrador
    } else {
      this.router.navigate(['/']); // Redirige al usuario a una ruta de acceso denegado
      return false;
    }
  }
}