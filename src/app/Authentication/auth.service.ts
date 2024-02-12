import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  constructor() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') ? true : false;
  }

  login()
  {
    localStorage.setItem('isLoggedIn','true');
    this.isLoggedIn = true;
  }

  logout()
  {
    localStorage.removeItem('isLoggedIn');
    
  }
}
