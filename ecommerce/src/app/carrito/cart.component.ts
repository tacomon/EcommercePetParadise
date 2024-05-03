import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { CartItem } from '../models/cartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    // Cargar datos del carrito desde el almacenamiento local
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
    }

    this.updateTotalAmount();
  }
  updateCartItem(item: CartItem): void {
    // Encuentra el índice del elemento en el carrito
    const index = this.cartItems.findIndex((cartItem) => cartItem.product._id === item.product._id);
    if (index !== -1) {
        // Actualiza la cantidad o cualquier otra propiedad del elemento del carrito
        this.cartItems[index].quantity = item.quantity;
        // También puedes realizar otras actualizaciones si es necesario
        // ...

        // Actualiza el carrito en el servicio (si es necesario)
        this.productoService.updateCart(this.cartItems);

        // Actualiza el monto total
        this.updateTotalAmount();
    }
}

  removeFromCart(item: CartItem): void {
    // Lógica para eliminar un elemento del carrito
    const index = this.cartItems.findIndex((cartItem) => cartItem.product._id === item.product._id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateTotalAmount();
    }
  }

  private updateTotalAmount(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.price, 0);
  }
  calculateTotalPrice(item: CartItem): void {
    item.price = item.product.precio * item.quantity;
  }
}

