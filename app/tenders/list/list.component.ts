import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import 'rxjs/add/operator/find';

import { Tender } from '../tender';

@Component({
  selector: 'evz-tender-list',
  styleUrls: ['tenders/list/list.css'],
  templateUrl: 'tenders/list/list.html'
})
export class TenderListComponent implements OnInit {
  @Input()
  private tenders: Tender[];

  constructor(private _router: Router) { }

  ngOnInit() { }

  onItemTap(tender: Tender) {
    this._router.navigate(['Report', { id: tender.id }])
  }
}

