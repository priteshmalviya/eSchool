import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {

  showAttendance:Boolean=true
  showAssignment:Boolean=false
  showStudents:Boolean=false


  sortInAscending:Boolean=false
  sortInDescending:Boolean=true

  usersList :  User[] = [];
  studentsList :  User[] = [];
  studentObj : User = {
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



  constructor(private auth : AuthService,private data : DataService,private router : Router){}

  ngOnInit(): void{
    if(localStorage.getItem('token')==null){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate([localStorage.getItem('role')]);
    }
    this.getAllUser()
  }

  
  getAllUser(){
    this.data.getAllUsers().subscribe(res=>{
       this.usersList = res.map((e:any) =>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        if(data.role=='student'){
          this.studentsList.push(data);
        }
        return data;
       })
    }, err => {
      alert(err.message)
    })
  }

  logout(){
    this.data.logout();
  }

  attendance(){
    this.showAssignment=false
    this.showStudents=false
    this.showAttendance=true
  }

  students(){
    this.showAssignment=false
    this.showAttendance=false
    this.showStudents=true
  }

  assignment(){
    this.showAttendance=false
    this.showStudents=false
    this.showAssignment=true
  }

  filter(){
    if(this.sortInAscending){
      this.studentsList.sort((a, b) => (a.first_name < b.first_name ? -1 : 1));
      this.sortInAscending=false
      this.sortInDescending=true
    }else{
      this.studentsList.sort((a, b) => (a.first_name > b.first_name ? -1 : 1));
      this.sortInAscending=true
      this.sortInDescending=false
    }
  }
}
