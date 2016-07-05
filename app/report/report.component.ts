import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { Page } from 'ui/page';
import cameraModule = require('camera');
import appSettings = require('application-settings');

import { InformationComponent } from './information/information.component';
import { ReportService } from './report.service';
import { SectionComponent } from './section/section.component';
import { Translations } from '../translations';
import { Report } from './report.model';
import { TenderService } from '../tenders/tender.service';

const options = { width: 1024, height: 768, keepAspectRatio: true }

@Component({
  directives: [InformationComponent, SectionComponent],
  selector: 'evz-report',
  templateUrl: 'report/report.html',
  styleUrls: ['report/report.css'],
  providers: [ReportService, TenderService]
})
export class ReportComponent implements OnInit {
  @ViewChild('photo0') photo0: ElementRef;
  @ViewChild('photo1') photo1: ElementRef;
  @ViewChild('photo2') photo2: ElementRef;
  @ViewChild('photo3') photo3: ElementRef;
  @ViewChild('photo4') photo4: ElementRef;
  @ViewChild('photo5') photo5: ElementRef;
  @ViewChild('photo6') photo6: ElementRef;
  @ViewChild('photo7') photo7: ElementRef;
  @ViewChild('photo8') photo8: ElementRef;
  @ViewChild('photo9') photo9: ElementRef;
  @ViewChild('photo10') photo10: ElementRef;
  @ViewChild('photo11') photo11: ElementRef;

  report: Report;
  t: Object;
  tender: any;
  isSegmentedBtnActive: Object;
  isLoading: boolean;
  collapse: Object;
  constructor(private location: Location, private params: RouteParams, private reportService: ReportService, private tenderService: TenderService) {
    let id = parseInt(params.get('id'), 10);
    this.report = new Report(id, new Date().toDateString(), 12, 3);
    this.tender = {
      progress: {}
    };
    this.isLoading = false;
    this.isSegmentedBtnActive = {
      90000: false,
      90001: true,
      90002: false
    }
    this.collapse = {
      visit: false,
      state: false,
      progress: false,
      forecast: false,
      doc: false,
      photos: false
    };
    this.t = new Translations();
  }

  ngOnInit() {
    this.isLoading = true;
    this.tenderService.fetchOne(this.report.id)
      .subscribe((tender) => {
        if (appSettings.hasKey(`report-${this.report.id}`)) {
          this.report.setData(JSON.parse(appSettings.getString(`report-${this.report.id}`)));
          this.onSegmentedButtonTap(this.report.state.state);
        }
        this.isLoading = false;
        this.tender = tender;
      });
  }

  public goBack() {
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

  public onSaveButtonTap() {
    appSettings.setString(`report-${this.report.id}`, JSON.stringify(this.report));
    alert('El reporte fue guardado');
    this.goBack();
  }

  /**
   * onSendButtonTap
   */
  public onSendButtonTap() {
    this.isLoading = true;
    this.reportService.send(this.report)
      .subscribe((response) => {
        this.isLoading = false;
        alert('El reporte fue creado con éxito.');
        this.goBack();
      }, (error) => {
        this.isLoading = false;
        alert('Hubo un error al enviar el reporte.');
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

  public closeSections(name: string) {
    console.log(JSON.stringify(this.collapse));
    console.log(JSON.stringify(name));
    for (let key in this.collapse) {
      if (this.collapse.hasOwnProperty(key)) {
        if (key === name) {
          this.collapse[key] = !this.collapse[key];
        } else {
          this.collapse[key] = false;
        }
      }
    }
    console.log(JSON.stringify(this.collapse));
  }
}
