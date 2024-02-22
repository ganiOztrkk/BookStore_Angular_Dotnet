import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddShoeModel } from '../models/add-shoe.model';
import { ErrorService } from './error.service';
import { ShoeModel } from '../models/shoe.model';
import { UpdateShoeModel } from '../models/update-shoe.model';
import { SwalService } from './swal.service';
import { ResponseModel } from '../models/response.model';
import { RequestModel } from '../models/request.model';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class ProductCrudService {

  product: ShoeModel = new ShoeModel();
  updateProduct: UpdateShoeModel = new UpdateShoeModel();
  response: ResponseModel = new ResponseModel();
  pageNumbers: number[] = [];
  request: RequestModel = new RequestModel();


  constructor(
    private http: HttpClient,
    private error: ErrorService,
    private swal: SwalService,
    private spinner: NgxSpinnerService) {

   }

   setPageNumber() {
    this.pageNumbers = [];

    for (let index = 0; index < this.response.totalPageCount; index++) {
      this.pageNumbers.push(index + 1);
    }
  }

   getAllNoFilter(pageNumber: number = 1) {
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

  getProductByIdToUpdate(id: number){
    this.http.get("https://localhost:7048/api/Shoes/GetByIdToUpdate/"+id)
    .subscribe({
      next: (res: any) => {
        this.updateProduct = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  productAdd(product: AddShoeModel){

    this.http.post("https://localhost:7048/api/Shoes/Add", product)
    .subscribe({
      next: (res: any) => {
        this.getAllNoFilter();
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  productUpdate(product: UpdateShoeModel){
    this.http.post("https://localhost:7048/api/Shoes/Update", product)
    .subscribe({
      next: (res: any) => {
        this.getAllNoFilter();
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  productDelete(id: number){
    this.swal.callSwal("Silmek istediğine emin misin?", "İptal", "Evet", () => {
      this.http.get("https://localhost:7048/api/Shoes/Remove/"+id)
      .subscribe({
      next: (res: any) => {
        this.getAllNoFilter(this.response.pageNumber);
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
    } )
  }
}
