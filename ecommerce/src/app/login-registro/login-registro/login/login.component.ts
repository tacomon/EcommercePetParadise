import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';

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
      email: ['', [Validators.required, Validators.email, this.validateEmailFormat]],
      password: ['', [Validators.required, this.validatePasswordFormat]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response: any) => {
          const token = response.token;
  
          // Enviar el token al correo electrónico del usuario
          this.authService.sendTokenToEmail(email, token).subscribe(
            () => {
              // Redirigir al componente ValidateTokenLoginComponent
              this.router.navigate(['/tokenlogin'], { queryParams: { email } });
              this.toastr.success('Token enviado al correo electrónico', 'Inicio de sesión exitoso');
            },
            (error: any) => {
              console.error('Error al enviar el token al correo electrónico:', error);
              this.toastr.error('Error al enviar el token al correo electrónico', 'Error');
            }
          );
        },
        (error: any) => {
          console.error('Error al iniciar sesión:', error);
          this.toastr.error('Verifique correo y contraseña!', 'Error al iniciar sesión');
        }
      );
    }
  }
  validateEmailFormat(control: FormControl) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  }

  validatePasswordFormat(control: FormControl) {
    const password = control.value;
    const numberPattern = /[0-9]/;
    const uppercasePattern = /[A-Z]/;

    if (!uppercasePattern.test(password)) {
      return { missingUppercase: true };
    }

    if (!numberPattern.test(password)) {
      return { missingNumber: true };
    }

    if (password.length < 6) {
      return { minLength: true };
    }

    return null;
  }
}
