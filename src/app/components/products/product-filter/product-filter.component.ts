import { Component, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  category$
  @Input() category!:string

  constructor(private categoryService: CategoryService){
    this.category$ = categoryService.getAll()
  }



}
