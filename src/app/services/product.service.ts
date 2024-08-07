import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/products/';
  }

  getListProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  saveProducts(product: Product): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, product);
  }

  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateProduct(id: number, product: Product): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, product);
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
}
