import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-ragister',
  templateUrl: './ragister.component.html',
  styleUrls: ['./ragister.component.css']
})
export class RagisterComponent {
  email : string = '';
  password : string = '';

  constructor(private auth : AuthService){}

  ragister(){
    if(this.email == '' || this.password == ''){
      alert("fill")
      return
    }

    this.auth.ragister(this.email,this.password);

    this.email = '';
    this.password = '';

  }
}
