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
  pageNumbers: number[] = [];
  request: RequestModel = new RequestModel();


  constructor( private http: HttpClient ) {
    this.getAll();
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

  setPageNumber(){
    this.pageNumbers = [];
    
    for (let index = 0; index < this.response.totalPageCount; index++) {
      this.pageNumbers.push(index + 1)
    }
  }




}