import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// Interfaz
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  API_URL = 'http://localhost:2200/api/producto';

  // NGROK = 'https://cbb9-190-121-193-214.ngrok.io'
  // API_URL = `${this.NGROK}/api/producto`;

  constructor(private http: HttpClient) { }

  // Obtener productos del colegio
  getProductos(){
    return this.http.get(`${this.API_URL}/getProductos`);
  }

  getProductoPorID(idProducto: string){
    return this.http.get(`${this.API_URL}/getProductoPorID/${idProducto}`);
  }

  addProducto(producto: Producto){
    return this.http.post(`${this.API_URL}/addProducto`, producto);
  }

  deleteProducto(idProducto: string, user: any){
    return this.http.put(`${this.API_URL}/deleteProducto/${idProducto}`, user);
  }

  updateProducto(idProducto: string, producto: Producto){
    return this.http.put(`${this.API_URL}/updateProducto/${idProducto}`, producto);
  }
}
