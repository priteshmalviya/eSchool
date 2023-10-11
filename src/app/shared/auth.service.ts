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
    dob : '',
    role : '',
  };

  
  
  getAllUser(email : string){
    this.data.getAllUsers().subscribe(res=>{
       this.userList = res.map((e:any) =>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;

        
        if(data.email == email){
          if(data.role == 'admin'){
            this.router.navigate(['dashboard']);
            console.log(data)
            return
          }
          if(data.role == 'teacher'){
            this.router.navigate(['teacher']);
            console.log(data)
            return
          }
          console.log(data)
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
        this.getAllUser(email)
        return
      }, err => {
          alert(err.message);
          this.router.navigate(['/login']);
      });
    }


}
