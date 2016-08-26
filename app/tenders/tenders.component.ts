import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/find';
import appSettings = require('application-settings');

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
  isLoading: boolean;
  constructor(private tenderService: TenderService, private _router: Router) {
    this.t = new Translations();
  }

  ngOnInit() {
    this.isLoading = true;
    this.tenders = this.tenderService.fetch(null, () => this.isLoading = false);
  }

  refreshList(args: any) {
    let pullRefresh = args.object;
    this.tenders = this.tenderService
      .fetch(pullRefresh);
  }

  onLogout() {
    appSettings.remove('token');
    appSettings.remove('user');
    this._router.navigate(['Login']);
  }
}
