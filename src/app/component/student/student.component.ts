import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/model/assignment';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  showAttendance:Boolean=true
  showAssignment:Boolean=false
  showResult:Boolean=false

  
  sortAssignmentInAscending:Boolean=false
  sortAssignmentInDescending:Boolean=true

  assignmentList :  Assignment[] = [];
  assignmentObj : Assignment = {
    name: '',
    subject: '',
    date: '',
    marks: '',
    id : ''
  };
  
  constructor(private auth : AuthService,private data : DataService,private router : Router){}

  ngOnInit(): void{
    if(localStorage.getItem('token')==null){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate([localStorage.getItem('role')]);
    }
    this.getAllAssignment()
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
  
  
  attendance(){
    this.showAssignment=false
    this.showResult=false
    this.showAttendance=true
  }

  result(){
    this.showAssignment=false
    this.showAttendance=false
    this.showResult=true
  }

  assignment(){
    this.showAttendance=false
    this.showResult=false
    this.showAssignment=true
  }

  logout(){
    this.data.logout();
  }
}
