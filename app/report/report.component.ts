import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { Page } from 'ui/page';
import cameraModule = require('camera');

import { InformationComponent } from './information/information.component';
import { ReportService } from './report.service';
import { SectionComponent } from './section/section.component';
import { Translations } from '../translations';
import { Report } from './report.model';
// import { Tender } from '../tenders/tender';
import { TenderService } from '../tenders/tender.service';

const _uniq = require('lodash.uniq');

@Component({
  directives: [InformationComponent, SectionComponent],
  selector: 'evz-report',
  templateUrl: 'report/report.html',
  styleUrls: ['report/report.css'],
  providers: [ReportService, TenderService]
})
export class ReportComponent implements OnInit {
  @ViewChild('photo') photo: ElementRef;

  report: Report;
  t: Object;
  tender: any;

  isDaySelected: Object;
  isRainSelected: Object;
  isSegmentedBtnActive: Object;
  constructor(private location: Location, private params: RouteParams, private reportService: ReportService, private tenderService: TenderService) {
    let id = parseInt(params.get('id'), 10);
    this.report = new Report(id, 43, 56, new Date().toDateString(), 6);
    this.tender = {};
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

  ngOnInit() {
    this.tenderService.fetchOne(this.report.id)
      .subscribe((tender) => this.tender = tender);
  }

  public goBack() {
    this.location.back();
  }

  public onStateButtonTab(state) {
    this.report.state.state = state;
  }

  public onDayButtonTap(day) {
    this.isDaySelected[day] = !this.isDaySelected[day];
    this.report.forecast.inspector.push(day);
    this.report.forecast.inspector = _uniq(this.report.forecast.inspector);
  }

  public onRainButtonTap(day) {
    this.isRainSelected[day] = !this.isRainSelected[day];
    this.report.forecast.rain.push(day);
    this.report.forecast.rain = _uniq(this.report.forecast.rain);
  }

  public onStartCamera(item) {
    let image = this.photo.nativeElement;
    cameraModule.takePicture({width: 1024, height: 768, keepAspectRatio: true}).then(picture => {
      image.imageSource = picture;
      item.path = picture;
    });
  }

  public onSaveButtonTap() {
    console.log('save !');
    console.log(JSON.stringify(this.report));
  }

  /**
   * onSendButtonTap
   */
  public onSendButtonTap() {
    console.log('send !');
    console.log(this.report);
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
