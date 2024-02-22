import { Component } from '@angular/core';
import { ProductCrudService } from '../../services/product-crud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  id: number = 0;

  constructor(
    public productCrud: ProductCrudService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });

      productCrud.getProductByIdToUpdate(this.id);
  }




}
