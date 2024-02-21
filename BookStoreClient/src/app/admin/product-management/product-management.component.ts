import { Component } from '@angular/core';
import { ResponseModel } from '../../models/response.model';
import { RequestModel } from '../../models/request.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent {
  response: ResponseModel = new ResponseModel();
  pageNumbers: number[] = [];
  request: RequestModel = new RequestModel();


  constructor(
    private http: HttpClient, 
    private spinner: NgxSpinnerService,
    private error: ErrorService
    ) {
    this.getAll();
  }


  getAll(pageNumber: number = 1) {
    this.request.pageNumber = pageNumber;
    this.request.pageSize = 10;
    this.spinner.show();
    this.http
      .post(`https://localhost:7048/api/Shoes/GetAllNoFilter`, this.request)
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


  setPageNumber() {
    this.pageNumbers = [];

    for (let index = 0; index < this.response.totalPageCount; index++) {
      this.pageNumbers.push(index + 1);
    }
  }

  
}
