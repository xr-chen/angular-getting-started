import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedin: boolean = false;

  isAdmin: boolean = false;

  constructor() { }

  login(email: string, password: string) {
    if (email === 'admin@gmail.com' && password === 'admin') {
      this.isLoggedin = true;
      this.isAdmin = true;
    } else if (email === 'user@gmail.com' && password === 'user') {
      this.isLoggedin = true;
      this.isAdmin = false;
    }
    return this.isLoggedin;
  }
}
