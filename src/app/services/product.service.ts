import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private PRODUCT_SERVICE_API = "http://localhost:8081/api/product"

  constructor(private http: HttpClient) { }

  save(product){
    return this.http.post<Product>(this.PRODUCT_SERVICE_API, product)
  }

  update(id: string, product: Product) {
    throw new Error('Method not implemented.');
  }

  getAll(){
    return this.http.get<Product[]>(this.PRODUCT_SERVICE_API, {headers: { 'No-Auth': 'True'}})
  }

  getProductById(id){
    return this.http.get<Product>(this.PRODUCT_SERVICE_API + '/' + id)
  }
}
