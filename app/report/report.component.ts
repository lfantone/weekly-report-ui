import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Rx';
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
  report: Report;
  t: Object;
  tender: any;
  isLoading: boolean;

  constructor(private location: Location, private params: RouteParams, private reportService: ReportService, private tenderService: TenderService) {
    let id = parseInt(params.get('id'), 10);
    this.report = new Report(id, new Date().toDateString());
    this.tender = {};
    this.isLoading = false;

    this.t = new Translations();
  }

  ngOnInit() {
    this.isLoading = true;
    this.tenderService.fetchOne(this.report.id)
      .subscribe((tender) => {
        if (appSettings.hasKey(`report-${this.report.id}`)) {
          this.report.setData(JSON.parse(appSettings.getString(`report-${this.report.id}`)));
        }
        this.isLoading = false;
        this.tender = tender;
        appSettings.setString('tender', JSON.stringify(tender));
      });
  }

  public goBack() {
    this.location.back();
  }

  public onSaveButtonTap() {
    let report = appSettings.getString(`report-${this.report.id}`);
    appSettings.setString(`report-${this.report.id}`, report);
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
}
