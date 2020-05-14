import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { stringify } from 'querystring';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user = new User();
  password: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
  }

  signUp(email, password) {
    this.authService.signUp(email, password).then(res => {
      /* Call the SendVerificaitonMail() function when new user sign 
      up and returns promise */
      this.authService.sendVerificationMail();
      this.authService.setUserData(this.getUserData());
    }).catch(error => {
      window.alert(error.message)
    });
  }

  getUserData(): User {
    return this.user;
  }


}
