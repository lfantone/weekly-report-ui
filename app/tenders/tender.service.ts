import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'

import { Tender } from './tender';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TenderService {
  constructor(private http: Http) { }

  fetch() : Observable<Tender[]> {
    console.log('Fetching tenders...');
    return this.http.get('./tenders.json')
      .map((res: Response) => {
        console.log('123123');
        return res.json();
      })
      .catch(this.handleError);
  }

  fetchOne(id: string) : Observable<Tender> {
    return this.http.get('./tenders.json')
      .map((res: Response) => {
        let tenders = res.json();
        return tenders.filter((t) => t.id === parseInt(id, 10)).pop();
      })
      .catch(this.handleError);
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
