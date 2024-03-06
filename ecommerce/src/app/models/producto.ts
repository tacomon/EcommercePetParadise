import { CartItem } from "./cartItem";
export class Producto {
    _id?: number;
    nombre: string;
    categoria: string;
    detalles: string;
    precio: number;
    tallas: number[]; // Usamos un array de números para representar las tallas
    imagen: string;

    constructor(nombre: string, categoria: string, precio: number, tallas: number[], detalles: string, imagen: string) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.tallas = tallas;
        this.detalles= detalles;
        this.imagen = imagen;
    }
}
