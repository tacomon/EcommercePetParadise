import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response: any) => {
          const token = response.token;
          localStorage.setItem('token', token);
          const rol = this.authService.getUsuarioRol();
          if (rol === 'administrador') {
            this.router.navigate(['/agregar']);
            this.toastr.success('Inicio se sesion exitoso adminnistrador!', 'Inicio de sesion !');
          } else {
            this.router.navigate(['']);
            this.toastr.success('Inicio se sesion exitoso!', 'Inicio de sesion !');
          }
        },
        (error: any) => {
          console.error('Error al iniciar sesión:', error);
          this.toastr.error('Verifique correo y contraseña!', 'Error al iniciar sesión!');
          // Mostrar un mensaje de error al usuario
        }
      );
    }
  }
}