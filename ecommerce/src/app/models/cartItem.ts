import { Producto } from './producto';

export interface CartItem {
  product: Producto;
  quantity: number;
  size: any;
  price: number;
  imagen: string;
}