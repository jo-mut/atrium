import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  entries: any[] = [];
  user: User = new User();

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.getEntries();
  }

  getEntries() {
    this.entries = ['Photographer', 'Painter', 'Scupltist', 'Videographer'];
  }

  getUserData() {
    return this.user;
  }

  onSubmit(form) {
    this.signUp(this.user);
    form.reset();
  }

  signUp(user: User) {
    this.authService.signUp(user).then(res => {
      /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
      this.authService.sendVerificationMail();
      this.authService.setUserData(this.getUserData());
    }).catch(error => {
      window.alert(error.message);
    });
  }


}
