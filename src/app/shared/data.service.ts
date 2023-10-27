import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { User } from '../model/user';
import { Router } from '@angular/router';
import { Assignment } from '../model/assignment';
import { Attendance } from '../model/attendance';
import { Result } from '../model/result';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private afs : AngularFirestore,private fireauth : AngularFireAuth,private router : Router,private Rdb : AngularFireDatabase,private toastr: ToastrService) {}

  // for users
  addUser(user : User){
    //user.id = this.afs.createId();
    //return this.afs.collection('/User').add(user); 
    user.id = user.email.substring(0, user.email.indexOf('.')).toLocaleLowerCase()
    return this.Rdb.list('Users/').set(user.id,user)
  }

  getAllUsers(){
    //const test2 = this.afs.collection('/User').snapshotChanges();
    //console.log("hello",test,test2)
    return this.Rdb.list('Users/').snapshotChanges();
  }

  getUser(id : string){
    id = id.substring(0, id.indexOf('.')).toLocaleLowerCase()
    //console.log("id -> ",id)
    return this.Rdb.list('Users/'+id+'/').valueChanges();
  }

  deleteUser(user : User){
    //this.afs.doc('/User/'+user.id).delete();
    this.Rdb.list('/Users/'+user.id).remove();
  }

  resetPass(email : string,currPass : string, pass : string){
    this.getUser(email.substring(1)).subscribe((snapshots) => {
      console.log(email,snapshots)
      email = typeof snapshots[3] === 'string' ? snapshots[3] : '';
        if (snapshots[6] == currPass) {
          this.updatePassword(email,pass);
          this.toastr.success('Your Password has Changed');
          return;
        } else {
          this.toastr.error('Current Password is Wrong');
          return
        }
    });
  }

  updatePassword(id : string,password : string){
    this.Rdb.list('/Users/'+id).set("/password/",password);
  }

  freezUnFreeze(user : User,f:boolean){
    this.Rdb.list('/Users/'+user.id).set("/status/",f);
  }

  //rajister mathod for rajistering new student and teacher
  //   only admin can use this
  ragister(user : User){
    this.fireauth.createUserWithEmailAndPassword(user.email,user.dob).then(()=>{
      this.addUser(user)
    }, err=>{
      this.toastr.error(err.message);
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
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    this.router.navigate(['/login'])
  }
}