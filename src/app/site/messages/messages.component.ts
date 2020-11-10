import { Component, OnInit } from '@angular/core';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { Contact } from '../contact-us/contact-us.component';



@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: Contact [] = [];

  constructor(private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages() {
    this.dbOperations.messageCollections()
      .ref.orderBy('time')
      .onSnapshot(data => {
        data.docs.forEach(d => {
          const data = d.data() as Contact;
          this.messages.push(data);
        })
      })
  }


}
