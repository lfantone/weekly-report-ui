import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Rx';

import {ReportService} from './report.service';
import {TenderService} from '../tenders/tender.service';
import {Tender} from '../tenders/tender';
import {Report} from './report';

@Component({
  selector: 'evz-report',
  templateUrl: 'report/report.html',
  styleUrls: ['report/report.css'],
  providers: [ReportService, TenderService]
})
export class ReportComponent implements OnInit {
  report: Object;
  tender: any;
  visitDate: boolean;
  state: boolean;
  progress: boolean;
  evaluation: boolean;
  condition: boolean;
  doc: boolean;
  photos: boolean;
  constructor(
    private location: Location,
    private params: RouteParams,
    private tenderService: TenderService,
    private reportService: ReportService
  ) {
    let date = new Date();
    this.tender = tenderService.fetchOne(params.get('id'));
    this.report = {
      id: this.tender.value.id,
      date: {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      },
      state: {
        state: '',
        reason: '',
        comment: ''
      },
      progress: {},
      evaluation: {},
      condition: {},
      doc: {},
      photos: {}
    };
    this.visitDate = false;
    this.state = false;
    this.progress = false;
    this.evaluation = false;
    this.condition = false;
    this.doc = false;
    this.photos = false;
  }

  ngOnInit() { }

  public goBack() {
    this.location.back();
  }

  public onItemTap(name) {
    console.log('Tapped', name);

    this[name] = !this[name];
  }
}
