import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RequestModel } from '../models/request.model';
import { ResponseModel } from '../models/response.model';
import { ShoeModel } from '../models/shoe.model';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { SwalService } from '../services/swal.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  response: ResponseModel = new ResponseModel();
  categories: any = [];
  pageNumbers: number[] = [];
  request: RequestModel = new RequestModel();
  searchCategory: string = '';

  constructor(
    private http: HttpClient, 
    public shopping: ShoppingCartService,
    private swal: SwalService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService
    ) {
    this.getAll();
    this.getCategories();


  }

  getAll(pageNumber: number = 1) {
    this.request.pageNumber = pageNumber;
    this.spinner.show();
    this.http
      .post(`https://localhost:7048/api/Shoes/GetAll`, this.request)
      .subscribe((res) => {
        this.response = <ResponseModel>res;
        this.setPageNumber();
        this.spinner.hide();
      });
  }

  getCategories() {
    this.http
      .get('https://localhost:7048/api/Categories/GetAll')
      .subscribe((res) => (this.categories = res));
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