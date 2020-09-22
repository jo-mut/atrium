import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-host-profile-modal',
  templateUrl: './host-profile-modal.component.html',
  styleUrls: ['./host-profile-modal.component.scss']
})
export class HostProfileModalComponent implements OnInit {

  info: string;
  constructor(
    public dialogRef: MatDialogRef<HostProfileModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.info = this.data.info
    console.log(this.data)
  }

}
