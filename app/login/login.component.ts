import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Color } from 'color';
import { Page } from 'ui/page';
import { TextField } from 'ui/text-field';
import { View } from 'ui/core/view';

import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Translations } from '../translations';

@Component({
  selector: 'evz-login',
  providers: [UserService],
  templateUrl: 'login/login.html',
  styleUrls: ['login/login.css'],
})
export class LoginComponent implements OnInit {
  private t: Object;

  @Input() user: User;
  @ViewChild('container') container: ElementRef;
  constructor(private _router: Router, private _userService: UserService, private page: Page) {
    this.t = new Translations();
    this.user = new User();
  }

  ngOnInit() {
    this.page.actionBarHidden = false;
  }

  submit() {
    if (this.user.isValid()) {
      this.login();
    }
  }

  login() {
    this._userService.login(this.user)
      .subscribe(
        () => this._router.navigate(['Tenders']),
        (error) => alert('Unfortunately we could not find your account.')
      );
  }

  toggleDisplay() {
    let container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: new Color('white'),
      duration: 200
    });
  }
}
