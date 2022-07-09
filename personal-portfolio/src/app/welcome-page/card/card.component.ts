import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() personName: string = "";
  @Input() designation: string = "";
  @Input() currentCompany: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
