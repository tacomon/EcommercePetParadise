import { CartItem } from "./cartItem";
export class Producto {
    _id: number;
    nombre: string;
    precio: number;
    detalles: string;
    categoria: string;
    talla: string;
    imagen: string;

    constructor(_id:number, nombre: string,  precio: number, detalles: string, talla: string, categoria: string,imagen: string) {
        this._id = _id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.talla = talla;
        this.detalles= detalles;
        this.imagen = imagen;
    }
}
