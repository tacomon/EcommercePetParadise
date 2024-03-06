import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './carga-productos/product.component';
import { CartComponent } from './carrito/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

// import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component:  ProductComponent },
  { path: 'product-detail/:id', component:  ProductDetailsComponent },
  { path: 'cart', component:  CartComponent }

  // { path: 'login', component:  LoginComponent }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
