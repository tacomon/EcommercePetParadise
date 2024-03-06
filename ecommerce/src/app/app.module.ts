import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './carga-productos/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './carrito/cart.component';


import {HttpClientModule} from '@angular/common/http'
import { Router, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { ProductoService } from './services/producto.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductDetailsComponent,
    CartComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-rigth',
    }),
  ],
  providers: [ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
