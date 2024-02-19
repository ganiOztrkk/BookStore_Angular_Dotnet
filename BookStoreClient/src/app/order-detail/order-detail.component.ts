import { Component } from '@angular/core';
import { OrderModel } from '../models/order.model';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
  orders: OrderModel[] = [];
  totalOrderAmount: number = 0;


  constructor(
    public order: OrderService,
    private route: Router) {
      if (order.ordersByOrderNumber.length === 0) {
        this.route.navigateByUrl("order");
      }else{
        this.orders = this.order.ordersByOrderNumber;
        this.calculateOrderAmount();
      }
      
  }

  calculateOrderAmount(){
    for(let item of this.orders){
      this.totalOrderAmount += item.price;
    }
    this.totalOrderAmount = parseFloat(this.totalOrderAmount.toFixed(2));
  }

}