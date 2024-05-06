import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-validate-token-login',
  templateUrl: './validate-token-login.component.html',
  styleUrls: ['./validate-token-login.component.css']
})
export class ValidateTokenLoginComponent {
  tokenForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.tokenForm = this.formBuilder.group({
      token: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.tokenForm.valid) {
      const token = this.tokenForm.value.token;
      this.authService.validateToken(token).subscribe(
        (response) => {
          console.log('Respuesta validateToken en el componente:', response);
          if (response.isValid) {
            this.authService.storeToken(token);
  
            const rol = response.rol;
            if (rol == 'administrador') {
              this.router.navigate(['/agregar']);
            } else {
              this.router.navigate(['']);
            }
            this.toastr.success('Token válido', 'Validación correcta');
          } else {
            this.toastr.error('Token inválido', 'Error de validación');
          }
        },
        (error) => {
          console.error('Error al validar el token:', error);
          this.toastr.error('Error al validar el token', 'Error de validación');
        }
      );
    }
  }
}

