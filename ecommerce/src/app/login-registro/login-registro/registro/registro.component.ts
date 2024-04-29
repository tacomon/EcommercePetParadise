import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmarPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const { nombre, email, password } = this.registroForm.value;
      this.http.post('http://localhost:4000/api/auth/registro', { nombre, email, password })
        .subscribe(
          (response) => {
            // Manejar la respuesta exitosa
            console.log('Usuario registrado correctamente');
            this.toastr.success('Se ha registrado correctamente!', 'Registro exitoso!');
            // Redirigir al usuario a la página de inicio de sesión
            this.router.navigate(['/login']);
          },
          (error) => {
            // Manejar el error
            console.error('Error al registrar el usuario:', error);
            this.toastr.error('Verifique correo y contraseña!', 'Error al iniciar sesión!');
            // Mostrar un mensaje de error al usuario
          }
        );
    }
  }
}