import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  adminToken: any = null;
  username: string = "";
  admin: string = "";


  constructor(
    private router: Router
  ) { }


  isAdminAuthenticated(){
    const tokenString = localStorage.getItem("adminToken");
    if (tokenString) {
      const tokenJson = JSON.parse(tokenString);
      this.adminToken = tokenJson;
      
      const decodedToken = this.getDecodedToken(this.adminToken);
      this.username = decodedToken.Username;
      this.admin = decodedToken.Admin;
      return true;
    }
    else{
      return false;
    }
  }

  getDecodedToken(token: string): any{
    try {
      const decodedToken = jwt.jwtDecode(token);
      return decodedToken;
      
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  logOut(){
    localStorage.removeItem("adminToken");
    this.router.navigateByUrl("/")
  }

}