import { Component } from '@angular/core';
import { AddShoeModel } from '../../models/add-shoe.model';
import { ProductCrudService } from '../../services/product-crud.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  addProduct: AddShoeModel = new AddShoeModel();


  constructor(
    public productCrud: ProductCrudService
  ) {
    
  }



}
