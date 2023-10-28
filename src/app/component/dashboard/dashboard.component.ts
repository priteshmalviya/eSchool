import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showResetPass:Boolean = false

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

  // for reseting password
  currPass : string = '';
  newPass : string = "";
  confirmPass : string = '';

  constructor(private auth : AuthService,private data : DataService,private router : Router,private toastr: ToastrService){}

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
      this.toastr.error(err.message)
    })
  }

  // adding new user
  addUser(){
    if(this.first_name == '' || this.last_name == '' || this.email == '' || this.mobile == '' || this.dob == '' || this.role == ''){
      this.toastr.warning('all fields are mandatory');
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

  
  // Enabling  and disbling user login
  freezUnFreeze(user : User, f : boolean){
    if(window.confirm('Are you sure you want to '+ (f ? "Enable " : "Disable ") + user.first_name + ' ' + user.last_name + ' ?')){
      this.data.freezUnFreeze(user,f)
    }
  }

  //logout
  logout(){
    this.data.logout();
  }

  
  // showing and hiding password reset form 
  openCloseResetPass(){
    this.showResetPass = !this.showResetPass
  }

  
  // reseting the user password
  resetPass(){
    if(this.currPass != "" && this.newPass != "" && this.confirmPass != ""){
      if(this.confirmPass==this.newPass){
        this.data.resetPass(JSON.stringify(localStorage.getItem('email') || ""),this.currPass,this.newPass)
        this.showResetPass = false
        this.currPass = '';
        this.newPass = '';
        this.confirmPass = '';
      }else{
        this.toastr.error("New Password and Confirm Password Do Not Match")
        this.currPass = '';
        this.newPass = '';
        this.confirmPass = '';
        return
      }
    }else{
      this.toastr.warning("All fields are mandatory")
      this.currPass = '';
      this.newPass = '';
      this.confirmPass = '';
      return
    }
  }
}
