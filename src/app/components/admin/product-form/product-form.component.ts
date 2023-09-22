import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Observable, Subscription } from 'rxjs'
import { CategoryService } from 'src/app/services/category.service';
import { Product } from 'src/app/models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  categories:Category[] = []
  showDelete:boolean = false;
  id!:string
  categorySubs:Subscription

  product: Product = {
    id: undefined,
    title: undefined,
    price: undefined,
    category: undefined,
    imageUrl: undefined
  }

  constructor(private categoryService: CategoryService, 
    private route: ActivatedRoute, private router: Router, 
    private productService: ProductService){
      this.categorySubs = this.categoryService.getAll().subscribe({
        next: (categories) => {
          this.categories = categories
        }
      })
  
      this.id = this.route.snapshot.paramMap.get('id')
    }

  ngOnInit(): void {
    if(this.id){
      this.showDelete = true
      this.productService.getProductById(this.id).subscribe({
        next: product => {
          this.product = product
        }
      })
    }

    // const routeSegments = this.route.snapshot.url.map(segment => segment.path)
    // const routePath = routeSegments.join('/')
    // if (routePath === 'admin/products/new') {
    //   this.showDelete = false
    // }
  }

  saveProduct(){
    if(this.id) this.productService.update(this.id, this.product)
    else {
      this.productService.save(this.product).subscribe({
        next: product => {
          this.router.navigate(['/admin/products'])
        }
      })
    }
  }

  deleteProduct(){
    console.log(this.product)
  }

  ngOnDestroy(): void {
    this.categorySubs.unsubscribe()
  }

}
