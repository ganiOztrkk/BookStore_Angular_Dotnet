import { Component } from '@angular/core';
import { ProductCrudService } from '../../services/product-crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  id: number = 0;

  constructor(
    public productCrud: ProductCrudService,
    private route: ActivatedRoute,
    private adminAuth: AdminAuthService,
    private router: Router) {
    if (this.adminAuth.isAdminAuthenticated()) {
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
      productCrud.getProductByIdToUpdate(this.id);
    }else{
      this.router.navigateByUrl("/admin");
    }
      
  }


}