import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  username: string;
  password: string;
  constructor(private router:Router) { }

  ngOnInit() {
    console.log("Login Page")
  }


  login() {
    // Implement your authentication logic here
    if (this.username === 'user' && this.password === 'password') {
      // Navigate to the home page after successful login
      this.router.navigate(['/home']);
    } else {
      // Handle invalid login credentials
      alert('Invalid username or password');
    }
  }

}
