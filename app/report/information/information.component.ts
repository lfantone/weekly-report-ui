import { Component, OnInit, Input } from '@angular/core';

import { DetailComponent } from './detail/detail.component';
import { Translations } from '../../translations';

@Component({
  selector: 'evz-information',
  directives: [DetailComponent],
  templateUrl: 'report/information/information.html',
  styleUrls: ['report/information/information.css']
})
export class InformationComponent implements OnInit {
  @Input()
  private cui: string;

  @Input()
  private establishment: string;

  @Input()
  private type: string;

  @Input()
  private lastReport: string;
  private t: Object;
  constructor() {
    this.t = new Translations();
  }

  ngOnInit() { }

}
