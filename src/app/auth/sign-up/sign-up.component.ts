import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {stringify} from 'querystring';
import {User} from 'src/app/models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user = new User();

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {

  }

  signUp() {
    // this.authService.signUp(this.user).then(res => {
    //   /* Call the SendVerificaitonMail() function when new user sign
    //   up and returns promise */
    //   // this.authService.sendVerificationMail();
    //   this.authService.setUserData(this.user);
    //   this.navigateToGallery();
    // }).catch(error => {
    //   window.alert(error.message)
    // });
  }


  navigateToGallery() {
  }


}
