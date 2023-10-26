import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { User } from '../model/user';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth,private router : Router,private data : DataService) { }

  userList :  User[] = [];
  userObj : User = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    dob: '',
    role: '',
    status: true,
    password: ''
  };

  
  // getting all users
  getAllUser(email : string){
    this.data.getAllUsers().subscribe(res=>{
       this.userList = res.map((e:any) =>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;

        
        if(data.email == email){
          localStorage.setItem('userId',data.id)
          if(data.role == 'admin'){
            localStorage.setItem('role', 'dashboard')
            this.router.navigate(['dashboard']);
            return
          }
          if(data.role == 'teacher'){
            localStorage.setItem('role', 'teacher')
            this.router.navigate(['teacher']);
            return
          }
          localStorage.setItem('role', 'student')
          this.router.navigate(['student']);
          return
        }

        return data;
       })
    }, err => {
      alert(err.message)
    })
  }

  //login mathod for user login
    login(email : string, pass : string){
      this.fireauth.signInWithEmailAndPassword(email,pass).then(()=>{
        localStorage.setItem('token', 'true')
        localStorage.setItem('email',email)
        this.getAllUser(email)
        return
      }, err => {
          alert(err.message);
          this.router.navigate(['/login']);
      });
    }


}
