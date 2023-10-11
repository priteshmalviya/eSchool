import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth,private router : Router) { }

  //login mathod for user login
    login(email : string, pass : string){
      this.fireauth.signInWithEmailAndPassword(email,pass).then(()=>{
        localStorage.setItem('token', 'true')
        this.router.navigate(['dashboard']);
      }, err => {
          alert(err.message);
          this.router.navigate(['/login']);
      });
    }

    //rajister mathod for rajistering new student and teacher
    //   only admin can use this
    ragister(email : string, pass : string){
      this.fireauth.createUserWithEmailAndPassword(email,pass).then(()=>{
        alert('done');
        this.router.navigate(['/login']);
      }, err=>{
        alert(err.message);
        this.router.navigate(['/ragister']);
      });
    }

    logout(){
      this.fireauth.signOut().then(()=>{
        localStorage.removeItem('token')
        this.router.navigate(['/login']);
      }, err=>{
          alert(err.message);
          this.router.navigate(['/dashboard']);
      });
    }

}
