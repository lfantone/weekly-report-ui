import { Component, ChangeDetectionStrategy, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { RouteParams } from '@angular/router-deprecated';
import cameraModule = require('camera');
import appSettings = require('application-settings');

import { Report } from '../report.model';
import { Translations } from '../../translations';

@Component({
  selector: 'evz-form',
  templateUrl: 'report/form/form.html',
  styleUrls: ['report/form/form.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  @ViewChild('photo0') photo0: ElementRef;
  @ViewChild('photo1') photo1: ElementRef;
  @ViewChild('photo2') photo2: ElementRef;
  @ViewChild('photo3') photo3: ElementRef;
  @ViewChild('photo4') photo4: ElementRef;
  @ViewChild('photo5') photo5: ElementRef;

  isSegmentedBtnActive: Object;
  name: String;
  report: Report;
  t: Object;
  tender: any;
  title: String;

  constructor(private location: Location, private params: RouteParams) {
    let id = parseInt(params.get('id'), 10);

    this.title = params.get('title');
    this.name = params.get('name');
    this.report = new Report(id, new Date().toDateString());
    this.isSegmentedBtnActive = {
      90000: false,
      90001: true,
      90002: false
    };
    this.tender = {
      progress: {}
    };

    this.t = new Translations();
  }

  ngOnInit() {
    let key = `report-${this.report.id}`;
    if (appSettings.hasKey(key)) {
      this.report.setData(JSON.parse(appSettings.getString(key)));
      this.onSegmentedButtonTap(this.report.state.state);
    }

    if (appSettings.hasKey('tender')) {
      this.tender = JSON.parse(appSettings.getString('tender'));
    }
  }

  public goBack() {
    appSettings.setString(`report-${this.report.id}`, JSON.stringify(this.report));
    this.location.back();
  }

  public onDayButtonTap(day: string) {
    this.report.setInspectorDay(day);
  }

  public onRainButtonTap(day: string) {
    this.report.setRainDay(day);
  }

  public onStartCamera(item) {
    let image = this[`photo${item.id}`].nativeElement;
    cameraModule.takePicture({}).then(picture => {
      image.imageSource = picture;
      item.path = picture.toBase64String('jpeg');
    });
  }

  /**
   * onSegmentedButtonTap
   */
  public onSegmentedButtonTap(id: number) {
    for (let key in this.isSegmentedBtnActive) {
      if (this.isSegmentedBtnActive.hasOwnProperty(key)) {
        this.isSegmentedBtnActive[key] = false;
      }
    }
    this.isSegmentedBtnActive[id] = !this.isSegmentedBtnActive[id];
    this.report.setState(id);
  }
}
