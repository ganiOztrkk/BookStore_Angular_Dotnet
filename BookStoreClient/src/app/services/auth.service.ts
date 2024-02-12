import { Injectable } from '@angular/core';
import * as jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accessToken: string = "";
  userId: string = "";
  userFullName: string = "";
  userName: string = "";


  constructor() { }

  isAuthenticated(){
    const accessTokenString = localStorage.getItem("accessToken");
    if (accessTokenString) {
      const accessTokenJson = JSON.parse(accessTokenString);
      this.accessToken = accessTokenJson;
      
      const decodedToken = this.getDecodedToken(this.accessToken);
      this.userId = decodedToken.UserId;
      this.userFullName = decodedToken.UserFullName;
      this.userName = decodedToken.Username;
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

}