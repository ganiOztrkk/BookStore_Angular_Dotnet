import { Injectable } from '@angular/core';
import { AdminGetOrderModel } from '../models/admin-get-order.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class OrderStatusService {
  orders: AdminGetOrderModel[] = [];

  constructor(private http: HttpClient, private error: ErrorService) {}

  getOrders(status: number | null = null) {
    this.http.get('https://localhost:7048/api/Orders/GettAllOrders').subscribe({
      next: (res: any) => {
        switch (status) {
          case null:
            this.orders = res;
            break;
          case 0:
            this.orders = res;
            this.pending();
            break;
          case 1:
            this.orders = res;
            this.preparing();
            break;
          case 2:
            this.orders = res;
            this.inTransit();
            break;
          case 3:
            this.orders = res;
            this.delivered();
            break;
          case 5:
            this.orders = res;
            this.returned();
            break;
          default:
            this.orders = res;
            break;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      },
    });
  }

  pending() {
    this.orders = this.orders.filter((x) => x.orderStatus == 0);
  }
  preparing() {
    this.orders = this.orders.filter((x) => x.orderStatus == 1);
  }
  inTransit() {
    this.orders = this.orders.filter((x) => x.orderStatus == 2);
  }
  delivered() {
    this.orders = this.orders.filter((x) => x.orderStatus == 3);
  }
  returned() {
    this.orders = this.orders.filter((x) => x.orderStatus == 5);
  }

  updateStatus(orderId: number, status: number){
    this.http.post("https://localhost:7048/api/Orders/UpdateOrderStatus",{orderId, status})
    .subscribe({
      next: () => {
        this.getOrders();
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }
}
