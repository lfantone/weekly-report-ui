import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/find';

import { TenderService } from './tender.service';
import { TenderListComponent } from './list/list.component';
import { Tender } from './tender';
import { Translations } from '../translations';

@Component({
  selector: 'evz-tenders',
  templateUrl: 'tenders/tenders.html',
  styleUrls: ['tenders/tenders.css'],
  directives: [TenderListComponent],
  providers: [TenderService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TendersComponent implements OnInit {
  t: Object;
  tenders: Observable<Tender[]>;
  constructor(private tenderService: TenderService) {
    this.t = new Translations();
  }

  ngOnInit() {
    this.tenders = this.tenderService.fetch();
  }

  refreshList(args: any) {
    let pullRefresh = args.object;
    // ONLY USING A TIMEOUT TO SIMULATE/SHOW OFF THE REFRESHING
    setTimeout(function () {
      pullRefresh.refreshing = false;
    }, 1000);
  }
}
