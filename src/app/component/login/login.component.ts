import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  id: string = '';
  role: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private data: DataService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigate([localStorage.getItem('role')]);
    }
  }

  // login the user

  login() {
    if (this.email == '' || this.password == '') {
      alert('all fields are mandatory');
      return;
    }

    //console.log(this.email,this.password)
    //this.auth.login(this.email,this.password)

    this.data.getUser(this.email).subscribe((snapshots) => {
      if (snapshots.length == 0 || snapshots[6]==null) {
        alert('user does not exist');
        this.email = '';
        this.password = '';
        return;
      } else {
        //console.log(snapshots);
        //console.log(typeof snapshots[7])
        this.id = typeof snapshots[3] === 'string' ? snapshots[3] : '';
        this.role = typeof snapshots[7] === 'string' ? snapshots[7] : '';
        if (snapshots[6] == this.password) {
          if (snapshots[8]) {
            localStorage.setItem('token', 'true');
            localStorage.setItem('email', this.email);
            localStorage.setItem('role', this.role);
            localStorage.setItem('userId', this.id);
            this.router.navigate(['/' + this.role]);
            return
          } else {
            alert('Your Account is Disabled by admin');
            this.email = '';
            this.password = '';
            return
          }
        } else {
          alert('Wrong Password');
          this.email = '';
          this.password = '';
          return
        }
      }
    });

    //console.log(this.email,this.password)
    return
  }
}
