import {Injectable} from '@angular/core';
import {Tender} from './tender';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/just';

const TENDERS : Tender[] = [
  {
    id: 1,
    program: 'FREC 2016 Obras Individuales',
    code: '1/2016/1',
    cui: '4634585679780',
    establishment: 'Escuela Secundaria No32 Mary O Graham',
    type: 'Rehabilitacion general',
    lastReport: '25 Abril de 2016',
    title: 'Inet 47/15'
  },
  {
    id: 2,
    program: 'FREC 2016 Obras Individuales',
    code: '1/2016/1',
    cui: '4634585679780',
    establishment: 'Escuela Secundaria No32 Mary O Graham',
    type: 'Rehabilitacion general',
    lastReport: '25 Abril de 2016',
    title: 'Inet 47/15'
  },
  {
    id: 3,
    program: 'FREC 2016 Obras Individuales',
    code: '1/2016/1',
    cui: '4634585679780',
    establishment: 'Escuela Secundaria No32 Mary O Graham',
    type: 'Rehabilitacion general',
    lastReport: '25 Abril de 2016',
    title: 'Inet 47/15'
  },
  {
    id: 4,
    program: 'FREC 2016 Obras Individuales',
    code: '1/2016/1',
    cui: '4634585679780',
    establishment: 'Escuela Secundaria No32 Mary O Graham',
    type: 'Rehabilitacion general',
    lastReport: '25 Abril de 2016',
    title: 'Inet 47/15'
  },
  {
    id: 5,
    program: 'FREC 2016 Obras Individuales',
    code: '1/2016/1',
    cui: '4634585679780',
    establishment: 'Escuela Secundaria No32 Mary O Graham',
    type: 'Rehabilitacion general',
    lastReport: '25 Abril de 2016',
    title: 'Inet 47/15'
  },
  {
    id: 6,
    program: 'FREC 2016 Obras Individuales',
    code: '1/2016/1',
    cui: '4634585679780',
    establishment: 'Escuela Secundaria No32 Mary O Graham',
    type: 'Rehabilitacion general',
    lastReport: '25 Abril de 2016',
    title: 'Inet 47/15'
  }
];

@Injectable()
export class TenderService {
  constructor() { }

  fetch() : Observable<Tender[]> {
    return Observable.create(observer => {
      observer.next(TENDERS);
      observer.complete();
    });
  }

  fetchOne(id: number) : Observable<Tender> {
    return Observable.of(TENDERS.filter((t) => t.id === id).pop());
  }
}
