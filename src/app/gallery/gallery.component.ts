import { Component, OnInit, Input } from '@angular/core';
import { Exhibition } from '../models/exhibition';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {

  exhibitions: Exhibition[];
 
  public ngOnInit(): void {
    
  }
}
