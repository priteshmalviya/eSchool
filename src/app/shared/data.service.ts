import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { User } from '../model/user';
import { Router } from '@angular/router';
import { Assignment } from '../model/assignment';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private afs : AngularFirestore,private fireauth : AngularFireAuth,private router : Router) {}

  addUser(user : User){
    user.id = this.afs.createId();
    return this.afs.collection('/User').add(user);
  }

  getAllUsers(){
    return this.afs.collection('/User').snapshotChanges();
  }

  getAllAssignment(){
    return this.afs.collection('/Assignment').snapshotChanges();
  }

  deleteUser(user : User){
    this.afs.doc('/User/'+user.id).delete();
  }

  

    //rajister mathod for rajistering new student and teacher
    //   only admin can use this
    ragister(user : User){
      this.fireauth.createUserWithEmailAndPassword(user.email,user.dob).then(()=>{
        this.addUser(user)
        alert('user is created');
      }, err=>{
        alert(err.message);
        this.router.navigate(['/dashboard']);
      });
    }


     //addAssignment mathod for adding new Assignment
    //   only teacher can use this
    addAssignment(assignment : Assignment){
      assignment.id = this.afs.createId();
      return this.afs.collection('/Assignment').add(assignment);
    }

    deleteAssignment(assignment : Assignment){
      this.afs.doc('/Assignment/'+assignment.id).delete();
    }

    

  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('userId')
      this.router.navigate(['/login']);
    }, err=>{
        alert(err.message);
        this.router.navigate([localStorage.getItem('role')]);
    });
  }
}