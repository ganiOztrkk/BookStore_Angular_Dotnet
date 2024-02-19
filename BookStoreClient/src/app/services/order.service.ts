import { Injectable } from '@angular/core';
import { OrderModel } from '../models/order.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ordersByOrderNumber: OrderModel[] = [];
  
  
  constructor(
    private http: HttpClient,
    private route: Router,
    private error: ErrorService) { }

  getByOrderNumber(orderNumber: string){
      this.http.get("https://localhost:7048/api/Orders/GetByOrderNumber/"+orderNumber).subscribe({
      next: (res: any) => {
        this.ordersByOrderNumber = [];
        this.ordersByOrderNumber = res;
        this.route.navigateByUrl("order-detail")
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }



}