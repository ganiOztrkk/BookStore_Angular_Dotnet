import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { RequestModel } from '../models/request.model';
import { ResponseModel } from '../models/response.model';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {
  response: ResponseModel = new ResponseModel();
  categories: any = [];
  pageNumbers: number[] = [];
  request: RequestModel = new RequestModel();
  searchCategory: string = '';


  constructor(
    private http: HttpClient, 
    public shopping: ShoppingCartService,
    private spinner: NgxSpinnerService,
    private error: ErrorService
    ) {
    this.getAll();
    this.getCategories();
  }


  getAll(pageNumber: number = 1) {
    this.request.pageNumber = pageNumber;
    this.spinner.show();
    this.http
      .post(`https://localhost:7048/api/Shoes/GetAll`, this.request)
      .subscribe({
        next: (res) => {
          this.response = <ResponseModel>res;
          this.setPageNumber();
          this.spinner.hide();
        },
        error: (err : HttpErrorResponse) => {
          this.error.errorHandler(err);
          this.spinner.hide();
        }
      });
  }

  getCategories() {
    this.http
      .get('https://localhost:7048/api/Categories/GetAll')
      .subscribe({
        next: (res) => {
          this.categories = res
        },
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
        }
      });
  }

  setPageNumber() {
    this.pageNumbers = [];

    for (let index = 0; index < this.response.totalPageCount; index++) {
      this.pageNumbers.push(index + 1);
    }
  }

  changeCategory(categoryId: number | null = null) {
    this.request.categoryId = categoryId;
    this.getAll(1);
  }

  
}
