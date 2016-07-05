import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Page } from 'ui/page';

import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Translations } from '../translations';
import appSettings = require('application-settings');

@Component({
  selector: 'evz-login',
  providers: [UserService],
  templateUrl: 'login/login.html',
  styleUrls: ['login/login.css'],
})
export class LoginComponent implements OnInit {
  private t: Object;

  @Input() user: User;
  constructor(private _router: Router, private _userService: UserService, private page: Page) {
    this.t = new Translations();
    this.user = new User();
  }

  ngOnInit() {
    this.page.actionBarHidden = false;
  }

  submit() {
    if (this.user.isValid()) {
      this.login(this.user);
    }
  }

  login(user) {
    this._userService.login(user)
    .subscribe(
      (response) => {
        if (response.success) {
          appSettings.setString('user', JSON.stringify(this.user));
          appSettings.setString('TOKEN', response.token);
          this._router.navigate(['Tenders']);
        } else {
          alert('Usuario y/o Password inexistentes.');
        }
      },
      (error) => {
        alert('Usuario y/o Password inexistentes.');
      }
    );
  }
}
