
import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../models/cartItem';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: string ='';
  productDetails: any ={}// Usa la interfaz Producto para tipar los datos

  constructor(private _productoService: ProductoService,
    private route: ActivatedRoute,
    private productService: ProductoService,
    private toastr: ToastrService
  ) {}
  addToCart(product: Producto): void {
    this._productoService.addToCart(product);
    this.toastr.success('Se agrego a carrito!', 'Productos agregdado!');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';

      // Luego, usa el productId para obtener los detalles del producto desde tu servicio de productos.
      this.productService.getProductDetails(this.productId).subscribe(data => {
        console.log(data);
        this.productDetails = data;
      });
      
    });
  }
}
