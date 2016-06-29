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
  tenders: Tender[];
  constructor(private tenderService: TenderService) {
    this.t = new Translations();
  }

  ngOnInit() {
    this.tenderService.fetch()
      .subscribe(tenders => this.tenders = tenders);
  }

  refreshList(args: any) {
    let pullRefresh = args.object;
    this.tenderService.fetch()
      .subscribe(tenders => {
        this.tenders = tenders;
        pullRefresh.refreshing = false;
      });
  }
}
