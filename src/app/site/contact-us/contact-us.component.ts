import { Component, HostListener, OnInit } from '@angular/core';
import { DbOperationsService } from 'src/app/services/db-operations.service';

export class Contact {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  time: string;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contact: Contact = new Contact();
  disabled = false;
  formWidth = 100;

  constructor(private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.getScreenSize();
  }

  onSubmit(form) {
    this.disabled = true;
    this.contact.time = Date.now() + '';
    let param = JSON.parse(JSON.stringify(this.contact));
    this.dbOperations.messageCollections()
    .doc(this.dbOperations.generatePushId()).set(param).then( res => {
      form.reset();
    }).catch(err => {
      this.disabled = false;
    })

  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let width = event.target.innerWidth;
    if (width > 800) {
      this.formWidth = 80;
    }

    if (width > 1000) {
      this.formWidth = 70;

    }

    if (width > 1200) {
      this.formWidth = 60;
    }

  }

  getScreenSize() {
    let width = window.innerWidth;
    if (width > 800) {
      this.formWidth = 80;
    }

    if (width > 1000) {
      this.formWidth = 70;

    }

    if (width > 1200) {
      this.formWidth = 60;
    }
  }


}
