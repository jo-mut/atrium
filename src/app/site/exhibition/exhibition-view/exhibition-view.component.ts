import { Component, OnInit, Input } from '@angular/core';
import { ArtWork } from 'src/app/models/artwork';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ArtworkModalComponent } from '../artwork-modal/artwork-modal.component';


@Component({
  selector: 'app-exhibition-view',
  templateUrl: './exhibition-view.component.html',
  styleUrls: ['./exhibition-view.component.scss']
})
export class ExhibitionViewComponent implements OnInit {

  exhibition: ArtWork = new ArtWork();
  id: number;

  constructor(private route: ActivatedRoute, private matDialog: MatDialog,
    private dbOperations: DbOperationsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getExhibitionDetail(this.id.toString());
  }

  getExhibitionDetail(id: string) {
      this.dbOperations.getExhibitionDetail()
      .ref.where('id', '==', id).onSnapshot(data => {
        data.docs.forEach(d => {
          const id = d.id;
          const work = d.data() as ArtWork;
          this.exhibition = work;
        })
      })

  }

  openArtworkModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "artwork-modal-component";
    dialogConfig.height = "100%";
    dialogConfig.width = "100vh";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ArtworkModalComponent, dialogConfig);
  }

}
