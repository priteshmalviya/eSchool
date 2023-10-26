import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

// to get and update user deatails
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
  id : string = '';
  first_name : string = '';
  last_name : string = '';
  email : string = '';
  mobile : string = '';
  dob : string = '';
  role : string = '';

  constructor(private auth : AuthService,private data : DataService,private router : Router){}

  ngOnInit(): void{
    if(localStorage.getItem('token')==null){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate([localStorage.getItem('role')]);
    }
    this.getAllUser();
  }

  // getting all user
  getAllUser(){
    this.data.getAllUsers().subscribe(res=>{
       this.userList = res.map((e:any) =>{
        //console.log("this",e.payload.val())
        const data = e.payload.val();
        //data.id = e.payload.doc.id;
        return data;
       })
    }, err => {
      alert(err.message)
    })
  }

  // adding new user
  addUser(){
    if(this.first_name == '' || this.last_name == '' || this.email == '' || this.mobile == '' || this.dob == '' || this.role == ''){
       alert('all fields are mandatory');
       return;
    }
    
    this.userObj.email= this.email
    this.userObj.first_name = this.first_name
    this.userObj.last_name = this.last_name
    this.userObj.mobile = this.mobile
    this.userObj.dob = this.dob
    this.userObj.role = this.role
    this.userObj.password = this.dob
    this.userObj.status = true

    this.data.addUser(this.userObj)

    this.resetForm()
  }

  // clearing the form
  resetForm(){
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.mobile = '';
    this.dob = '';
    this.role = '';
  }

  // deleting the user
  deleteUser(user : User){
    if (window.confirm('Are you sure you want to delete ' + user.first_name + ' ' + user.last_name + ' ?')) {
      this.data.deleteUser(user);
    }
  }

  freezUnFreeze(user : User, f : boolean){
    if(f){
      window.confirm('Are you sure you want to UnFreeze ' + user.first_name + ' ' + user.last_name + ' ?')
      this.data.freezUnFreeze(user,f)
    }else{
      window.confirm('Are you sure you want to Freeze ' + user.first_name + ' ' + user.last_name + ' ?')
      this.data.freezUnFreeze(user,f)
    }
  }

  //logout
  logout(){
    this.data.logout();
  }
}
