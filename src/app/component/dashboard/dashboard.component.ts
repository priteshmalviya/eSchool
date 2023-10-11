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

  userList :  User[] = [];
  userObj : User = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    dob : '',
    role : ''
  };
  id : string = '';
  first_name : string = '';
  last_name : string = '';
  email : string = '';
  mobile : string = '';
  dob : string = '';
  role : string = ''

  constructor(private auth : AuthService,private data : DataService,private router : Router){}

  ngOnInit(): void{
    if(localStorage.getItem('token')==null){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate([localStorage.getItem('role')]);
    }
    this.getAllUser();
  }

  getAllUser(){
    this.data.getAllUsers().subscribe(res=>{
       this.userList = res.map((e:any) =>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
       })
    }, err => {
      alert(err.message)
    })
  }

  addUser(){
    if(this.first_name == '' || this.last_name == '' || this.email == '' || this.mobile == '' || this.dob == '' || this.role == ''){
       alert('fill');
       return;
    }
    
    this.userObj.email= this.email
    this.userObj.first_name = this.first_name
    this.userObj.last_name = this.last_name
    this.userObj.mobile = this.mobile
    this.userObj.dob = this.dob
    this.userObj.role = this.role

    this.data.ragister(this.userObj)

    this.resetForm()
  }

  resetForm(){
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.mobile = '';
    this.dob = '';
    this.role = '';
  }

  deleteUser(user : User){
    if (window.confirm('Are you sure you want to delete ' + user.first_name + ' ' + user.last_name + ' ?')) {
      this.data.deleteUser(user);
    }
  }

  logout(){
    this.data.logout();
  }
}
