import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {TenderService} from './tender.service';
import {Tender} from './tender';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'evz-tenders',
  templateUrl: 'tenders/tenders.html',
  styleUrls: ['tenders/tenders.css'],
  providers: [TenderService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TendersComponent implements OnInit {
  tenders: Observable<Tender[]>;
  constructor(private tenderService: TenderService) { }

  ngOnInit() {
    this.tenders = this.tenderService.fetch()
      .map(result => result.tenders);
  }

  onItemTap(args) {
    console.log("------------------------ ItemTapped: " + args.index);
  }

}
