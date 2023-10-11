import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  userList :  User[] = [];
  userObj : User = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: ''
  };
  id : string = '';
  first_name : string = '';
  last_name : string = '';
  email : string = '';
  mobile : string = '';

  constructor(private auth : AuthService,private data : DataService){}

  ngOnInit(): void{
    this.getAllUser();
  }

  getAllUser(){
    this.data.getAllUsers().subscribe(res=>{
       this.userList = res.map((e:any) =>{
        const data = e.payload.doc.data;
        data.id = e.payload.doc.id;
        return data;
       })
    }, err => {
      alert(err.message)
    })
  }

  addUser(){
    if(this.first_name == '' || this.last_name == '' || this.email == '' || this.mobile == ''){
       alert('fill');
       return;
    }
    
    this.userObj.email= this.email
    this.userObj.first_name = this.first_name
    this.userObj.last_name = this.last_name
    this.userObj.mobile = this.mobile

    this.data.addUser(this.userObj)

    this.resetForm()
  }

  resetForm(){
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.mobile = '';
    
  }

  updateUser(){

  }
}
