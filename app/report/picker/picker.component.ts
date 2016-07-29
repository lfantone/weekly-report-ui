import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evz-picker',
  templateUrl: 'report/picker/picker.html',
  styleUrls: ['report/picker/picker.css']
})
export class PickerComponent implements OnInit {
  @Input()
  private items: Array<string>;
  @Input()
  private selectedIndex: number;
  private list: Array<{name: string, selected: boolean}>;

  constructor() {
    this.list = [];
    this.items = [];
    this.selectedIndex = 0;
  }

  ngOnInit() {
    if (this.items.length > 0) {
      for (let i = 0; i < this.items.length; i++) {
        this.list.push({name: this.items[i], selected: false});
      }
    }

    if (this.selectedIndex >= 0 && this.selectedIndex <= this.items.length) {
      this.list[this.selectedIndex].selected = true;
    }
  }

  public onTap(index) {
    this.selectedIndex = index;
    for (let i = 0; i < this.list.length; i++) {
      this.list[i].selected = i === index;
    }
  }

  public getSelectedIndex() {
    return this.selectedIndex;
  }
}
