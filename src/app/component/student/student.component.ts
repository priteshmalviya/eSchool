import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  
  constructor(private auth : AuthService,private data : DataService,private router : Router){}

  ngOnInit(): void{
    if(localStorage.getItem('token')==null){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate([localStorage.getItem('role')]);
    }
  }

  

  logout(){
    this.data.logout();
  }
}
