import {Injectable} from '@angular/core';
import {Tender} from './tender';
import {Observable} from 'rxjs/Rx';

const TENDERS = [{
    id: 1,
    program: 'FREC 2016 Obras Individuales',
    code: '1/2016/1'
  },
  {
    id: 2,
    program: 'FREC 2016 Obras Individuales',
    code: '1/2016/1'
  },
  {
    id: 3,
    program: 'FREC 2016 Obras Individuales',
    code: '1/2016/1'
  },
  {
    id: 4,
    program: 'FREC 2016 Obras Individuales',
    code: '1/2016/1'
  },
  {
    id: 5,
    program: 'FREC 2016 Obras Individuales',
    code: '1/2016/1'
  },
  {
    id: 6,
    program: 'FREC 2016 Obras Individuales',
    code: '1/2016/1'
  }];

@Injectable()
export class TenderService {
  constructor() { }

  fetch() : Observable<{ success: boolean, tenders: Tender[] }> {
    return Observable.create(observer => {
      observer.next({
        success: true,
        tenders: TENDERS
      });
      observer.complete();
    });
  }
}
