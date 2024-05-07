import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/products';
  }
  
  getProducts(): Observable<Product[]>{
    
    /* const token = JSON.parse(localStorage.getItem('token') || '{}').token;
    console.log('Token:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`, { headers: headers } ); */

    //return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);antes
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`).pipe(
      map((response: any) => {
        if (response && response.listProductos && Array.isArray(response.listProductos)) {
          return response.listProductos; // Devolver la lista de productos
        } else {
          // Si la propiedad 'listProductos' no está presente o no es una matriz, devolver una matriz vacía
          console.error('La respuesta del servidor no tiene la estructura esperada.');
          return [];
        }
      })
    );
  }

}
