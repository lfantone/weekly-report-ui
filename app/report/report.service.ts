import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Report } from './report';
import { Observable } from 'rxjs/Rx';
import { Audits, States, Progress, Doc, Evaluation, Forecast} from './mappings';
import appSettings = require('application-settings');
const _cloneDeep = require('lodash.clonedeep');

@Injectable()
export class ReportService {
  private url: string = `${appSettings.getString('URL')}/reports`;
  constructor(private http: Http) { }

  send(report: Report) {
    let body = JSON.stringify(this.map(report));
    let headers = new Headers({
      'Authorization': `BEARER ${appSettings.getString('TOKEN')}`,
      'Content-Type': 'application/json'
    });
    console.log('Sending report...');
    return this.http.post(this.url, body, {headers})
      .map((res: Response) => res.json())
      .catch((error: any) => {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
      });
  }

  private map(report: Report) {
    let r = _cloneDeep(report);

    if (report.progress) {
      r.progress.reason = Progress[report.progress.reason].key;
    }

    if (report.state) {
      r.state.reason = States.reason[report.state.reason].key;
    }

    if (report.evaluation) {
      r.evaluation.concept = Evaluation[report.evaluation.concept].key;
      r.evaluation.quality = Evaluation[report.evaluation.quality].key;
    }

    if (report.doc) {
      r.doc.book = Doc[report.doc.book].key;
    }

    if (report.audits) {
      for (let i = 0; i < report.audits.length; i++) {
        r.audits[i].value = Audits[report.audits[i].value].key;
      }
    }

    return r;
  }
}
