import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http'

import { Tender } from './tender';
import { Observable } from 'rxjs/Observable';
import appSettings = require('application-settings');
const _isArray = require('lodash.isarray');

@Injectable()
export class TenderService {
  private url: string = `${appSettings.getString('URL')}/tenders`
  constructor(private http: Http) { }

  fetch(pullRefresh: any = null, callback: any = undefined) : Observable<Tender[]> {
    let headers = new Headers({'Authorization': `BEARER ${appSettings.getString('TOKEN')}`});
    console.log('Fetching tenders...');
    return this.http.get(this.url, {headers})
      .map((res: Response) => {
        let json = res.json();
        if (pullRefresh) {
          pullRefresh.refreshing = false;
        }

        if (callback) {
          callback();
        }
        appSettings.setString('tenders', JSON.stringify(json));
        return json;
      })
      .catch(this.handleError);
  }

  fetchOne(id: number) : Observable<Tender> {
    let headers = new Headers({'Authorization': `BEARER ${appSettings.getString('TOKEN')}`});
    console.log(`Fetching tender with id: ${id}`);
    return this.http.get(`${this.url}/${id}`, {headers})
      .map((res: Response) => {
        let json = res.json();
        appSettings.setString(`tender-${id}`, JSON.stringify(json));
        return json;
      })
      .catch(this.handleError);
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `Error: ${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
