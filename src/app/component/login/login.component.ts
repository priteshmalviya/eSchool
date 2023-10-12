import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email : string = '';
  password : string = '';

  constructor(private auth : AuthService,private router : Router){}

  ngOnInit(): void{
    if(localStorage.getItem('token')!=null){
      this.router.navigate([localStorage.getItem('role')]);
    }
  }

  // login the user

  login(){
    if(this.email == '' || this.password == ''){
      alert('all fields are mandatory');
      return
    }

    this.auth.login(this.email,this.password)

    this.email = '';
    this.password = '';

  }

}
