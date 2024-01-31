import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RequestModel } from '../models/request.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  response: any ;
  categories: any = [];
  pageNumbers: number[] = [];
  request: RequestModel = new RequestModel();
  searchCategory: string = "";


  constructor( private http: HttpClient ) {
    this.getAll();
    this.getCategories();
  }

  getAll(pageNumber:number = 1){
    this.request.pageNumber = pageNumber;
    this.http
    .post(`http://localhost:5110/api/Shoes/GetAll`, this.request)
    .subscribe(res => {
      this.response = res;
      this.setPageNumber();
    })
  }

  getCategories(){
    this.http
    .get("http://localhost:5110/api/Categories/GetAll")
    .subscribe(res => this.categories = res)
  }

  setPageNumber(){
    this.pageNumbers = [];
    
    for (let index = 0; index < this.response.totalPageCount; index++) {
      this.pageNumbers.push(index + 1)
    }
  }

  changeCategory(categoryId: number | null = null){
    this.request.categoryId = categoryId;
    this.getAll(1);
  }


}