import { Component, OnInit } from '@angular/core';

class GuidelinesData {
  images: any[];
  backgroundImage: string;
}

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrls: ['./guidelines.component.scss']
})
export class GuidelinesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
