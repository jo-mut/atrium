import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-term-modal',
  templateUrl: './term-modal.component.html',
  styleUrls: ['./term-modal.component.scss']
})
export class TermModalComponent implements OnInit {

  firstName: string;
  lastName: string;
  date: string;
  name: string;
  email: string;
  telephone: string;
  guardian: string;
  participant: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form) {

  }

  onSubmitMinorsConsent(form) {

  }
}
