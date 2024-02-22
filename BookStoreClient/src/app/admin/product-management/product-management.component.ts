import { Component } from '@angular/core';
import { ProductCrudService } from '../../services/product-crud.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent {
  


  constructor(
    public product: ProductCrudService
    ) {
    this.product.getAllNoFilter();
  }

 

  
}
