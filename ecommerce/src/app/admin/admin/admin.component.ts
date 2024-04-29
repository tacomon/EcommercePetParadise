import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  listProductos: Producto[] = [];
  
  constructor(
    @Inject(ProductoService) private _productoService: ProductoService,
    private toastr: ToastrService
  ) {}


  ngOnInit(): void {
    this.obtenerProducto();
  }


  obtenerProducto() {
    this._productoService.getProducto().subscribe((data: Producto[]) => {
      console.log(data);
      this.listProductos = data;
    }, (error: any) => {
      console.log(error);
    })
  }

  eliminarProducto(id: any) {
    this._productoService.eliminarProducto(id).subscribe(
      (data: any) => {
        this.toastr.success('El producto fue eliminado con éxito', 'Producto Eliminado');
        this.obtenerProducto();
        window.location.reload();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
};

const routesMap = new Map([['admin', '/admin']]);

 