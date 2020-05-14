import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  email: string;
  password: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  signIn(email: string, password: string) {
    this.authService.signIn(email, password);
  }

  signInWithGoogle() {
    this.authService.googleAuth();
  }

}