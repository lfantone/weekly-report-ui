import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router-deprecated';
import {TenderService} from './tender.service';
import {Tender} from './tender';


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
    this.tenders = this.tenderService.fetch()
      .map(result => result.tenders);
  }

  onItemTap(args) {
    this._router.navigate(['Report', { id: 1 }]);
  }
}
