import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { Page } from 'ui/page';
import cameraModule = require('camera');

import { InformationComponent } from './information/information.component';
import { ReportService } from './report.service';
import { SectionComponent } from './section/section.component';
import { TenderService } from '../tenders/tender.service';
import { Tender } from '../tenders/tender';
import { Translations } from '../translations';
import { Report } from './report';

@Component({
  directives: [InformationComponent, SectionComponent],
  selector: 'evz-report',
  templateUrl: 'report/report.html',
  styleUrls: ['report/report.css'],
  providers: [ReportService, TenderService]
})
export class ReportComponent implements OnInit {
  @ViewChild('photo') photo: ElementRef;

  report: any;
  tender: any;
  t: Object;

  isDaySelected: Object;
  isRainSelected: Object;
  isSegmentedBtnActive: Object;
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
      }, {
        title: '',
        comment: '',
        path: ''
      }, {
        title: '',
        comment: '',
        path: ''
      }, {
        title: '',
        comment: '',
        path: ''
      }, {
        title: '',
        comment: '',
        path: ''
      }, {
        title: '',
        comment: '',
        path: ''
      }]
    };

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

    this.isSegmentedBtnActive = {
      good: false,
      regular: true,
      bad: false
    }
    this.t = new Translations();
  }

  ngOnInit() { }

  public goBack() {
    this.location.back();
  }

  public onStateButtonTab() {
    console.log('Tapped', arguments);
  }

  public onDayButtonTap(day) {
    console.log(day, 'tapped');
    this.isDaySelected[day] = !this.isDaySelected[day];
  }

  public onRainButtonTap(day) {
    console.log(day, 'tapped');
    this.isRainSelected[day] = !this.isRainSelected[day];
  }

  public onCameraTest() {
    let image = this.photo.nativeElement;
    console.log('tapped photo !');
    cameraModule.takePicture({width: 1024, height: 768, keepAspectRatio: true}).then(picture => {
      image.imageSource = picture;
    });
  }

  public onSaveButtonTap() {
    console.log('save !');
  }

  /**
   * onSendButtonTap
   */
  public onSendButtonTap() {
    console.log('send !');
  }

  /**
   * onSegmentedButtonTap
   */
  public onSegmentedButtonTap(name) {
    for (let key in this.isSegmentedBtnActive) {
      if (this.isSegmentedBtnActive.hasOwnProperty(key)) {
        this.isSegmentedBtnActive[key] = false;
      }
    }
    this.isSegmentedBtnActive[name] = !this.isSegmentedBtnActive[name];
    this.report.state.state = name;
  }
}
