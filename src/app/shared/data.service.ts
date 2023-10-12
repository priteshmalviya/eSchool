import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { User } from '../model/user';
import { Router } from '@angular/router';
import { Assignment } from '../model/assignment';
import { Attendance } from '../model/attendance';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private afs : AngularFirestore,private fireauth : AngularFireAuth,private router : Router) {}

  // for users
  addUser(user : User){
    user.id = this.afs.createId();
    return this.afs.collection('/User').add(user);
  }

  getAllUsers(){
    return this.afs.collection('/User').snapshotChanges();
  }

  deleteUser(user : User){
    this.afs.doc('/User/'+user.id).delete();
  }

  //rajister mathod for rajistering new student and teacher
  //   only admin can use this
  ragister(user : User){
    this.fireauth.createUserWithEmailAndPassword(user.email,user.dob).then(()=>{
      this.addUser(user)
    }, err=>{
      alert(err.message);
      this.router.navigate(['/dashboard']);
    });
  }

  // for Assignment

     //addAssignment mathod for adding new Assignment
    //   only teacher can use this
    addAssignment(assignment : Assignment){
      assignment.id = this.afs.createId();
      return this.afs.collection('/Assignment').add(assignment);
    }

    getAllAssignment(){
      return this.afs.collection('/Assignment').snapshotChanges();
    }

    deleteAssignment(assignment : Assignment){
      this.afs.doc('/Assignment/'+assignment.id).delete();
    }


  //for Attendance


    //addAssignment mathod for adding Attendance
    //   only teacher can use this
    addAttendance(attendance : Attendance){
      attendance.id = this.afs.createId();
      return this.afs.collection('/Attendance').add(attendance);
    }

    
  getAllAttendance(){
    return this.afs.collection('/Attendance').snapshotChanges();
  }

  // for Result

    //addAssignment mathod for adding Result
    //   only teacher can use this
    addResult(result : Result){
      result.id = this.afs.createId();
      return this.afs.collection('/Result').add(result);
    }

    getAllResult(){
      return this.afs.collection('/Result').snapshotChanges();
    }

    
// clearing local storage and sign out user


  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('userId')
      localStorage.removeItem('email')
      this.router.navigate(['/login'])
    }, err=>{
        alert(err.message);
        this.router.navigate([localStorage.getItem('role')]);
    });
  }
}