import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private CATEGORY_API="http://localhost:8081/api/category"

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Category[]>(this.CATEGORY_API, {headers: { 'No-Auth': 'True'}})
  }
}
