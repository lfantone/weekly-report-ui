import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Rx';
import cameraModule = require('camera');

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
  forecast: boolean;
  doc: boolean;
  photos: boolean;
  isDaySelected: Object;
  isRainSelected: Object;
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
      progress: {
        last: 0,
        delta: 0,
        reason: ''
      },
      evaluation: {
        concept: '',
        quality: ''
      },
      forecast: {
        listVisit: date.toDateString(),
        inspector: [],
        rain: [],
        audit: [{
          sector: '',
          date: date
        }]
      },
      doc: {
        quantity: 0,
        book: ''
      },
      photos: [{
        title: '',
        comment: '',
        path: ''
      }]
    };
    this.visitDate = false;
    this.state = false;
    this.progress = false;
    this.evaluation = false;
    this.forecast = false;
    this.doc = false;
    this.photos = false;

    this.isDaySelected = {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    };

    this.isRainSelected = {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    };
  }

  ngOnInit() { }

  public goBack() {
    this.location.back();
  }

  public onItemTap(name) {
    this[name] = !this[name];
  }

  public onStateButtonTab() {
    console.log('Tapped', arguments);
  }

  public onDayButtonTap(day) {
    this.isDaySelected[day] = !this.isDaySelected[day];
  }

  public onRainButtonTap(day) {
    console.log(day, 'tapped');
    this.isRainSelected[day] = !this.isRainSelected[day];
  }

  public onCameraTest() {
    console.log(cameraModule, 'tapped photo !');
    cameraModule.takePicture().then(picture => {
      console.log('Result is an image source instance', picture);
    });
  }
}
