import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  response: any ;
  pageNumbers: number[] = [];


  constructor( private http: HttpClient ) {
    this.getAll();
  }

  getAll(pageNumber:number = 1){
    this.http.get(`http://localhost:5110/api/Shoes/GetAll/${pageNumber}/10`)
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