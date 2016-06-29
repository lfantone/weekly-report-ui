import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'

import { Tender } from './tender';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TenderService {
  constructor(private http: Http) { }

  fetch() : Observable<Tender[]> {
    console.log('Fetching tenders...');
    return this.http.get('http://192.168.1.104:3000/tenders')
      .map((res: Response) => res.json().data)
      .catch(this.handleError);
  }

  fetchOne(id: number) : Observable<Tender> {
    console.log(`Fetching tender with id: ${id}`);
    return this.http.get(`http://192.168.1.104:3000/tender/${id}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `Error: ${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
