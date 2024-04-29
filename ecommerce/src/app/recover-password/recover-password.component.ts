import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {
  recoverForm: FormGroup;
  
    constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private router: Router,
      private toastr: ToastrService
    ) {
      this.recoverForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]]
      });
    }
  onSubmit() {
    if (this.recoverForm.valid) {
      const { email } = this.recoverForm.value;
      this.http
        .post('http://localhost:4000/api/auth/recover-password', { email })
        .subscribe(
          (response) => {
            // Manejar la respuesta exitosa
            console.log('Token de recuperación enviado');
            this.toastr.success('Se ha enviado su token!', 'Verificacion exitosa!');
            // Redirigir al componente ResetPasswordComponent y pasar el correo electrónico
            this.router.navigate(['/restablecer'], { queryParams: { email } });
          },
          (error) => {
            // Manejar el error
            console.error('Error al enviar la solicitud de recuperación:', error);
          }
        );
    }
  }
}