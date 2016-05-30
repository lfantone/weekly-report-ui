import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evz-detail',
  styleUrls: ['report/information/detail/detail.css'],
  templateUrl: 'report/information/detail/detail.html'
})
export class DetailComponent implements OnInit {
  @Input()
  private title: string;

  @Input()
  private subTitle: string;

  constructor() { }

  ngOnInit() { }

}
