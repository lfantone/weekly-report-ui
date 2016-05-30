import { Component, ChangeDetectionStrategy, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Page } from 'ui/page';
import { View } from 'ui/core/view';

@Component({
  selector: 'evz-section',
  templateUrl: 'report/section/section.html',
  styleUrls: ['report/section/section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent implements OnInit {
  @Input()
  private collapse: Boolean;
  @Input()
  private className: String;
  @Input()
  private title: String;
  @ViewChild('box') box: ElementRef;

  constructor(private page: Page) { }

  ngOnInit() { }

  public onItemTap(name) {
    this.collapse = !this.collapse;
  }
}
