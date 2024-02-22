import { Component } from '@angular/core';
import { OrderStatusService } from '../../services/order-status.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css'
})
export class OrderManagementComponent {
  


  constructor(
    public orderManage: OrderStatusService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      let statusNo: number = +params['status'];
      orderManage.getOrders(statusNo);
    });
  }

  
  
}