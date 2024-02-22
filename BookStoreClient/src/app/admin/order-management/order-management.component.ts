import { Component } from '@angular/core';
import { OrderStatusService } from '../../services/order-status.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css'
})
export class OrderManagementComponent {
  


  constructor(
    public orderManage: OrderStatusService,
    private route: ActivatedRoute,
    private adminAuth: AdminAuthService,
    private router: Router) {
    if (this.adminAuth.isAdminAuthenticated()) {
      this.route.params.subscribe(params => {
        let statusNo: number = +params['status'];
        orderManage.getOrders(statusNo);
      });
    }else{
      this.router.navigateByUrl("/admin");
    }
  }
}