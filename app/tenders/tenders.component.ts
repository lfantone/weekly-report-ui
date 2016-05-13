import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router-deprecated';
import {TenderService} from './tender.service';
import {Tender} from './tender';
import 'rxjs/add/operator/find';


@Component({
  selector: 'evz-tenders',
  templateUrl: 'tenders/tenders.html',
  styleUrls: ['tenders/tenders.css'],
  providers: [TenderService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TendersComponent implements OnInit {
  tenders: Observable<Tender[]>;
  constructor(private _router: Router, private tenderService: TenderService) { }

  ngOnInit() {
    this.tenders = this.tenderService.fetch();
  }

  onItemTap(evt) {
    let tender : Tender;
    this.tenders.find((t) => {
      tender = t[evt.index];
      return true;
    });
    this._router.navigate(['Report', { id: tender.id }]);
  }
}
