import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/model/assignment';
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


  sortAssignmentInAscending:Boolean=false
  sortAssignmentInDescending:Boolean=true

  
  sortStudentsInAscending:Boolean=false
  sortStudentsInDescending:Boolean=true

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

  assignmentList :  Assignment[] = [];
  assignmentObj : Assignment = {
    name: '',
    subject: '',
    date: '',
    marks: '',
    id : ''
  };
  Aname:string = '';
  Asubject:string = '';
  Adate:string = '';
  Amarks:string = '';


  constructor(private auth : AuthService,private data : DataService,private router : Router){}

  ngOnInit(): void{
    if(localStorage.getItem('token')==null){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate([localStorage.getItem('role')]);
    }
    this.getAllUser()
    this.getAllAssignment()
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

  filterStudents(){
    if(this.sortStudentsInAscending){
      this.studentsList.sort((a, b) => (a.first_name < b.first_name ? -1 : 1));
      this.sortStudentsInAscending=false
      this.sortStudentsInDescending=true
    }else{
      this.studentsList.sort((a, b) => (a.first_name > b.first_name ? -1 : 1));
      this.sortStudentsInAscending=true
      this.sortStudentsInDescending=false
    }
  }

  addAssignment(){
    if(this.Aname == "" || this.Adate == '' || this.Amarks =='' || this.Asubject ==''){
       alert('fill all');
       return;
    }

    this.assignmentObj.date=this.Adate
    this.assignmentObj.marks = this.Amarks
    this.assignmentObj.name = this.Aname
    this.assignmentObj.subject =this.Asubject

    this.data.addAssignment(this.assignmentObj)

    this.Aname = ""
    this.Adate = ""
    this.Amarks = ""
    this.Asubject = ""
  }

  filterAssignment(){
    if(this.sortAssignmentInAscending){
      this.assignmentList.sort((a, b) => (a.date < b.date ? -1 : 1));
      this.sortAssignmentInAscending=false
      this.sortAssignmentInDescending=true
    }else{
      this.assignmentList.sort((a, b) => (a.date > b.date ? -1 : 1));
      this.sortAssignmentInAscending=true
      this.sortAssignmentInDescending=false
    }
  }

  getAllAssignment(){
    this.data.getAllAssignment().subscribe(res=>{
       this.assignmentList = res.map((e:any) =>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
       })
    }, err => {
      alert(err.message)
    })
  }

  deleteAssignment(assignment : Assignment){
    if (window.confirm('Are you sure you want to delete ' + assignment.name + ' ?')) {
      this.data.deleteAssignment(assignment);
    }
  }

}
