// ValidateTokenComponent.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-validate-token',
  templateUrl: './validate-token.component.html',
  styleUrls: ['./validate-token.component.css']
})
export class ValidateTokenComponent {
  tokenForm: FormGroup;
  token: string = '';
  email: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.tokenForm = this.formBuilder.group({
      token: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onSubmit() {
    if (this.tokenForm.valid) {
      this.token = this.tokenForm.value.token;
  
      this.authService.validarToken(this.token).subscribe(
        (response) => {
          this.router.navigate(['/restablecer'], { queryParams: { email: this.email } });
          this.toastr.success('Token válido', 'validación correcta');
        },
        (error) => {
          console.error('Error al validar el token:', error);
          this.toastr.error('Token inválido', 'Error de validación');
        }
      );
    }
  }
}