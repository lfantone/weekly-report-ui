import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Rx';

import {ReportService} from './report.service';
import {Report} from './report';

@Component({
  selector: 'evz-report',
  templateUrl: 'report/report.html',
  styleUrls: ['report/report.css'],
  providers: [ReportService]
})
export class ReportComponent implements OnInit {
  report: Observable<Report>;
  constructor(private location: Location, private routeParams: RouteParams, private reportService: ReportService) { }

  ngOnInit() {  }

  public goBack() {
    this.location.back();
  }
}
