import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public personName: string = "";
  public designation: string = "";
  public currentCompany: string = "";

  constructor() { }

  ngOnInit(): void {
    this.personName = "Santhosh Venugopal";
    this.designation = "Software Engineer";
    this.currentCompany="IQVIA"
  }

}
