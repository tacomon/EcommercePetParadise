import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';

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
      email: ['', [Validators.required, Validators.email, this.validateEmailFormat]],
      password: ['', [Validators.required, this.validatePasswordFormat]],
      confirmarPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm && this.registroForm.valid) {
      const passwordControl = this.registroForm.get('password');
      const confirmarPasswordControl = this.registroForm.get('confirmarPassword');
  
      if (passwordControl && confirmarPasswordControl && passwordControl.value === confirmarPasswordControl.value) {
        const { nombre, email, password } = this.registroForm.value;
        
        this.http.post('http://localhost:4000/api/auth/registro', { nombre, email, password })
          .subscribe(
            (response) => {
              console.log('Usuario registrado correctamente');
              this.toastr.success('Se ha registrado correctamente!', 'Registro exitoso!');
              this.router.navigate(['/login']);
            },
            (error) => {
              console.error('Error al registrar el usuario:', error);
              this.toastr.error('Verifique correo y contraseña!', 'Error al iniciar sesión!');
            }
          );
      } else {
        this.toastr.error('Las contraseñas no coinciden', 'Error en el registro');
      }
    }
  }
  
  validatePasswordFormat(control: FormControl) {
    const password = control.value;
    const numberPattern = /[0-9]/;
    const uppercasePattern = /[A-Z]/;

    console.log('Password:', password);
    console.log('Number pattern test:', numberPattern.test(password));
    console.log('Lowercase pattern test:', uppercasePattern.test(password));
    console.log('Password length:', password.length);

  
    if (!uppercasePattern.test(password)) {
      return { missingUppercase: true };
    }
  
    if (password.length < 6) {
      return { minLength: true };
    }
    if (!numberPattern.test(password)) {
      return { missingNumber: true };
    }
  
    return null;
  }
  
  
  passwordsMatch(control: FormControl) {
    const password = control.root.get('password');
    return password && control.value === password.value ? null : { 'passwordsNotMatch': true };
  }
  
  validateEmailFormat(control: FormControl) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  }
  
}