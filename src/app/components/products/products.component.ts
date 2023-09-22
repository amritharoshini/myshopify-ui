import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = []
  filteredProducts: Product[] = []
  prodSubs: Subscription
  category: string

  constructor(private productService: ProductService, private route: ActivatedRoute){
    this.route.queryParamMap.subscribe({
      next: category => {
        this.category = category.get('category')
        this.filteredProducts = this.category ? this.products.filter(p => p.category === this.category) : this.products
      }
    })
  }

  ngOnInit(): void {
    this.prodSubs = this.productService.getAll().subscribe({
      next: products => {
        this.products = products
        this.filteredProducts = products
      }
    })
  }

  ngOnDestroy(): void {
    this.prodSubs.unsubscribe()
  }

}
