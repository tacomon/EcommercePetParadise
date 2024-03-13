import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './carga-productos/product.component';
import { CartComponent } from './carrito/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ErrorPersonalizadoComponent } from './error-personalizado/error-personalizado.component';
import { LoginComponent } from './login-registro/login-registro/login/login.component';
import { FooterComponent } from './footer/footer/footer.component';
import { RegistroComponent } from './login-registro/login-registro/registro/registro.component';

// import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component:  ProductComponent },
  { path: 'login',  component: LoginComponent},
  { path: 'product-detail/:id', component:  ProductDetailsComponent },
  { path: 'cart', component:  CartComponent },
  { path: 'registro', component:  RegistroComponent },
  { path: '**',  component: ErrorPersonalizadoComponent},
  { path: 'footer',  component: FooterComponent},




  // { path: 'login', component:  LoginComponent }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
