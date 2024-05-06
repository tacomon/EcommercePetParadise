import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './carga-productos/product.component';
import { CartComponent } from './carrito/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ErrorPersonalizadoComponent } from './error-personalizado/error-personalizado.component';
import { LoginComponent } from './login-registro/login-registro/login/login.component';
import { FooterComponent } from './footer/footer/footer.component';
import { RegistroComponent } from './login-registro/login-registro/registro/registro.component';
import { ProductRegisterComponent } from './product-register/product-register/product-register.component';
import { InformacionComponent } from './informacion/informacion.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './auth.guard';
<<<<<<< HEAD
import { AdminComponent } from './admin/admin.component';
=======
import { AdminComponent } from './admin/admin/admin.component';
import { ValidateTokenComponent } from './validate-token/validate-token.component';
import { ValidateTokenLoginComponent } from './validate-token-login/validate-token-login.component';
>>>>>>> 936e91e6b3ceac0dbdef63d89af1eca79e39f3f9

const routes: Routes = [  
  { path: '', component:  ProductComponent },
  { path: 'agregar', component: ProductRegisterComponent, canActivate: [AuthGuard] },
  { path: 'info',  component: InformacionComponent},
  { path: 'login',  component: LoginComponent},
  { path: 'token',  component: ValidateTokenComponent },
  { path: 'tokenlogin',  component: ValidateTokenLoginComponent },
  { path: 'recuperacion',  component: RecoverPasswordComponent}, 
  { path: 'restablecer',  component: ResetPasswordComponent}, 
  { path: 'product-detail/:id', component:  ProductDetailsComponent },
  { path: 'cart', component:  CartComponent },
  { path: 'registro', component:  RegistroComponent },
<<<<<<< HEAD
  // { path: 'agregar', component: ProductRegisterComponent, canActivate: [AuthGuard] }, // Ruta protegida
  { path: 'agregar', component: ProductRegisterComponent}, // Ruta protegida
  { path: 'editar/:id', component: ProductRegisterComponent},
=======
>>>>>>> 936e91e6b3ceac0dbdef63d89af1eca79e39f3f9
  { path: 'registroP', component: AdminComponent}, // Ruta protegida
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**',  component: ErrorPersonalizadoComponent},
  { path: 'footer',  component: FooterComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
