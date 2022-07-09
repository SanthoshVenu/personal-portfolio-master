import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public personName: string = "";
  public designation: string = "";
  public currentCompany: string = "";

  constructor() { }

  ngOnInit(): void {
    this.personName = "Santhosh Venugopal";
    this.designation = "Software Engineer";
    this.currentCompany = "IQVIA"
  }
}
