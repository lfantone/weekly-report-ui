import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

@Component({
  selector: 'evz-section',
  templateUrl: 'report/section/section.html',
  styleUrls: ['report/section/section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent implements OnInit {
  @Input()
  private name: String;
  @Input()
  private title: String;
  @Input()
  private id: Number;

  constructor(private _router: Router) { }

  ngOnInit() { }

  public onItemTap() {
    this._router.navigate(['Form', { title: this.title, name: this.name, id: this.id }]);
  }
}
