import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterModel } from '../models/register.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SwalService } from '../services/swal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = "";
  lastname: string = "";
  email: string = "";
  username: string = "";
  password: string = "";
  registerRequest: RegisterModel = new RegisterModel();

  constructor(
    private http: HttpClient,
    private router: Router,
    private swal: SwalService
    ) {
    
  }

  register(form: NgForm){
    this.registerRequest.name = this.name;
    this.registerRequest.lastname = this.lastname;
    this.registerRequest.email = this.email;
    this.registerRequest.username = this.username;
    this.registerRequest.password = this.password;

    if (form.valid) {
      this.http.post("https://localhost:7048/api/Auth/Register", this.registerRequest).subscribe( (res: any) => {
        this.swal.callToast(res.message, "success");
        this.router.navigateByUrl("/");
      })
    }
  }


}