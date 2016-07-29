import { Component, ChangeDetectionStrategy, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { RouteParams } from '@angular/router-deprecated';
import cameraModule = require('camera');
import appSettings = require('application-settings');

import { Report } from '../report.model';
import { Translations } from '../../translations';
import { PickerComponent } from '../picker/picker.component';

@Component({
  selector: 'evz-form',
  templateUrl: 'report/form/form.html',
  styleUrls: ['report/form/form.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [PickerComponent]
})
export class FormComponent implements OnInit {
  @ViewChild('photo0') photo0: ElementRef;
  @ViewChild('photo1') photo1: ElementRef;
  @ViewChild('photo2') photo2: ElementRef;
  @ViewChild('photo3') photo3: ElementRef;
  @ViewChild('photo4') photo4: ElementRef;
  @ViewChild('photo5') photo5: ElementRef;
  @ViewChild('state') state: PickerComponent;
  @ViewChild('progress') progress: PickerComponent;
  @ViewChild('concept') concept: PickerComponent;
  @ViewChild('quality') quality: PickerComponent;
  @ViewChild('audit1') audit1: PickerComponent;
  @ViewChild('audit2') audit2: PickerComponent;
  @ViewChild('audit3') audit3: PickerComponent;
  @ViewChild('doc') doc: PickerComponent;

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
      let report = JSON.parse(appSettings.getString(key));
      if (typeof report.date.model === 'string') {
        report.date.model = new Date(report.date.model);
      }

      this.report.setData(report);
      this.onSegmentedButtonTap(this.report.state.state);
    }

    if (appSettings.hasKey('tender')) {
      this.tender = JSON.parse(appSettings.getString('tender'));
    }
  }

  public goBack() {
    this.location.back();
  }

  public onDayButtonTap(day: string) {
    this.report.setInspectorDay(day);
  }

  public onSubmitButtonTap() {
    this.report.setDate(this.report.date.model);
    this.report.setAuditsDate(this.report.audits);
    if (this.state) {
      this.report.setStateReason(this.state.getSelectedIndex());
    }

    if (this.progress) {
      this.report.setProgressReason(this.progress.getSelectedIndex());
    }

    if (this.audit1 && this.audit2 && this.audit3) {
      this.report.setAudit(0, this.audit1.getSelectedIndex());
      this.report.setAudit(1, this.audit2.getSelectedIndex());
      this.report.setAudit(2, this.audit3.getSelectedIndex());
    }

    if (this.concept) {
      this.report.setConcept(this.concept.getSelectedIndex());
    }

    if (this.doc) {
      this.report.setDocBook(this.doc.getSelectedIndex());
    }

    if (this.quality) {
      this.report.setQuality(this.quality.getSelectedIndex());
    }

    appSettings.setString(`report-${this.report.id}`, JSON.stringify(this.report));
    this.goBack();
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
