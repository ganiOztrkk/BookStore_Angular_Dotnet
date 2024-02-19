import { Component } from '@angular/core';
import { OrderModel } from '../models/order.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/error.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  orders: OrderModel[] = [];
  

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private error: ErrorService,
    public order: OrderService) {

      this.getAll();
      
    }


  getAll(){
    this.auth.isAuthenticated();
    this.http.get("https://localhost:7048/api/Orders/GetAllByUserId/"+ this.auth.userId).subscribe({
      next: (res : any) => {
        this.orders = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  checkRefundAvailable(orderDate: string): boolean {
    // Gelen stringi tarih formatına dönüştür
    const orderDateParts = orderDate.split('.');
    const formattedOrderDate = orderDateParts[2] + '-' + orderDateParts[1] + '-' + orderDateParts[0];
  
    // Sipariş tarihini Date nesnesine çevirme
    const orderDateObj = new Date(formattedOrderDate);
  
    // Bugünün tarihini al
    const today = new Date();
  
    // İki tarih arasındaki farkı hesapla (milisaniye cinsinden)
    const differenceInTime = today.getTime() - orderDateObj.getTime();
  
    // Farkı gün cinsine dönüştür
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  
    // Kontrolü gerçekleştir
    if (differenceInDays < 15) {
      // 15 günden az
      return true;
    } else {
      // 15 günden fazla veya eşit
      return false;
    }
  }

}
