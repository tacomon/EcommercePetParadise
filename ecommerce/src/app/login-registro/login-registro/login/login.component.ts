import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
// import { AppModule } from '../app.module'; 



interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // user: User = {
  //   email: '',
  //   password: ''
  // };

  // constructor(private router: Router) {

    
  // }

  // onSubmit() {
  //   // Verifica las credenciales del usuario y redirige a la página principal o muestra un mensaje de error
  //   if (this.user.email === 'email@ejemplo.com' && this.user.password === 'password') {
  //     this.router.navigate(['/']);
  //   } else {
  //     alert('Credenciales inválidas');
  //   }
  // }
}