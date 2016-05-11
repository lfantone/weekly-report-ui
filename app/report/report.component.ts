import {Component, OnInit} from '@angular/core';
import {TextField} from 'ui/text-field';

@Component({
  selector: 'evz-report',
  templateUrl: 'report/report.html',
  styleUrls: ['report/report.css']
})
export class ReportComponent implements OnInit {
  message: string;
  constructor() {}

  ngOnInit() {
    this.message = 'This is an awesome report';
  }

}
