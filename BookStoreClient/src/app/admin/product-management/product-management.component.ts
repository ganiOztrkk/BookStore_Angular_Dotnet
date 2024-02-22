import { Component } from '@angular/core';
import { ProductCrudService } from '../../services/product-crud.service';
import { AdminAuthService } from '../../services/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent {
  


  constructor(
    public product: ProductCrudService,
    public adminAuth: AdminAuthService,
    private route: Router
    ) {
    if (this.adminAuth.isAdminAuthenticated()) {
      this.product.getAllNoFilter();
    }else{
      this.route.navigateByUrl("/admin")
    }
  }

 

  
}
