import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Assignment } from 'src/app/model/assignment';
import { Attendance } from 'src/app/model/attendance';
import { Result } from 'src/app/model/result';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {

  
  // for components
  showAttendance:Boolean=true
  showAssignment:Boolean=false
  showStudents:Boolean=false
  showResult:Boolean = false
  showResetPass:Boolean = false


  //for soring the assignments
  sortAssignmentInAscending:Boolean=false
  sortAssignmentInDescending:Boolean=true

  
  //for soring the students
  sortStudentsInAscending:Boolean=false
  sortStudentsInDescending:Boolean=true

  // for loading data
  usersList :  User[] = [];
  studentsList :  User[] = [];
  studentObj : User = {
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

  
  // for reseting password
  currPass : string = '';
  newPass : string = "";
  confirmPass : string = '';

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

  attendanceList :  Attendance[] = [];
  attendanceObj : Attendance = {
    name: '',
    email: '',
    month: '',
    attendance: '',
    id: ''
  };

  Sname : string='';
  Semail : string= '';
  Amonth : string = '';
  Sattendance : string = '';


  

  ResultList :  Result[] = [];
  resultObj : Result = {
    exam: '',
    email: '',
    total: '',
    obtained: '',
    id: '',
    subject: ''
  };

  Rexam : string = ""
  Remail : string = ""
  Rtotal : string = ""
  Robtained : string = ""
  Rsubject : string = ""


  constructor(private auth : AuthService,private data : DataService,private router : Router,private toastr: ToastrService){}

  ngOnInit(): void{
    if(localStorage.getItem('token')==null){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate([localStorage.getItem('role')]);
    }
    this.getAllUser()
    this.getAllAssignment()
    this.getAllAttendance()
    this.getAllResult()
  }

  // for users
  getAllUser(){
    this.data.getAllUsers().subscribe(res=>{
       this.usersList = res.map((e:any) =>{
        const data = e.payload.val();
        //data.id = e.payload.doc.id;
        if(data.role=='student'){
          this.studentsList.push(data);
        }
        return data;
       })
    }, err => {
      this.toastr.error(err.message)
    })
  }

  logout(){
    this.data.logout();
  }
  
  //for components

  attendance(){
    this.showAssignment=false
    this.showStudents=false
    this.showResult =false
    this.showAttendance=true
  }

  students(){
    this.showAssignment=false
    this.showAttendance=false
    this.showResult =false
    this.showStudents=true
  }

  assignment(){
    this.showAttendance=false
    this.showStudents=false
    this.showResult =false
    this.showAssignment=true
  }

  // for results
  result(){
    this.showAttendance=false
    this.showStudents=false
    this.showAssignment=false
    this.showResult =true
  }

  // for students

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

  // for assignment

  addAssignment(){
    if(this.Aname == "" || this.Adate == '' || this.Amarks =='' || this.Asubject ==''){
      this.toastr.warning('all fields are mandatory');
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
      this.toastr.error(err.message)
    })
  }

  deleteAssignment(assignment : Assignment){
    if (window.confirm('Are you sure you want to delete ' + assignment.name + ' ?')) {
      this.data.deleteAssignment(assignment);
    }
  }

// for attendance
  addAttendance(){
    if(this.Sname == "" || this.Amonth == '' || this.Sattendance =='' || this.Semail ==''){
      this.toastr.warning('all fields are mandatory');
       return;
    }

    this.attendanceObj.name = this.Sname
    this.attendanceObj.email = this.Semail
    this.attendanceObj.month = this.Amonth
    this.attendanceObj.attendance = this.Sattendance

    this.data.addAttendance(this.attendanceObj)

    this.Sname = ""
    this.Amonth = ""
    this.Sattendance = ""
    this.Semail = ""
  }

  getAllAttendance(){
    this.data.getAllAttendance().subscribe(res=>{
       this.attendanceList = res.map((e:any) =>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
       })
    }, err => {
      this.toastr.error(err.message)
    })
  }

  
  // for results

  addResult(){
    if(this.Remail == "" || this.Rexam == '' || this.Robtained =='' || this.Rtotal =='' || this.Rtotal == ''){
      this.toastr.warning('all fields are mandatory');
       return;
    }

    this.resultObj.email = this.Remail
    this.resultObj.exam = this.Rexam
    this.resultObj.obtained = this.Robtained
    this.resultObj.total = this.Rtotal
    this.resultObj.subject = this.Rsubject

    this.data.addResult(this.resultObj)

    this.Remail = ""
    this.Rexam = ""
    this.Robtained=""
    this.Rtotal = ""
    this.Rsubject = ""
  }

  getAllResult(){
    this.data.getAllResult().subscribe(res=>{
       this.ResultList = res.map((e:any) =>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
       })
    }, err => {
      this.toastr.error(err.message)
    })
  }

  openCloseResetPass(){
    this.showResetPass = !this.showResetPass
  }

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
