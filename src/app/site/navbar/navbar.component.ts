import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateModalComponent } from 'src/app/admin/create-modal/create-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private hidden = false

  constructor(private router: Router, private matDialog: MatDialog)  { }

  ngOnInit(): void {
  }

  showHideSidebar() {
    if (this.hidden) {
      this.hidden = false;
    }else {
      this.hidden = true;
    }
  }

  logout() {
    this.router.navigateByUrl('/sign-in')
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "40%";
    dialogConfig.width = "60%";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(CreateModalComponent, dialogConfig);
  }

}
