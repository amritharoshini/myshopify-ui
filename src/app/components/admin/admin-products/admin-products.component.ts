import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products:Product[]
  filteredProducts:Product[]
  productSubs: Subscription
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>()

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      searching: false,
    }

    this.productSubs = this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products
        this.filteredProducts = products
        this.dtTrigger.next(null)
      }
    })
  }

 filter(query){
  this.filteredProducts = query ? this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase())) : this.products
 }

 ngOnDestroy(): void {
   this.productSubs.unsubscribe()
 }


}
