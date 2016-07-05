import { Component, OnInit } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';
import { NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS } from 'nativescript-angular/router';
// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

import { LoginComponent } from './login/login.component';
import { TendersComponent } from './tenders/tenders.component';
import { ReportComponent } from './report/report.component';
import appSettings = require('application-settings');

@Component({
  selector: 'evz-app',
  directives: [NS_ROUTER_DIRECTIVES],
  providers: [NS_ROUTER_PROVIDERS],
  template: '<page-router-outlet></page-router-outlet>'
})
@RouteConfig([
  { path: '/login', component: LoginComponent, name: 'Login' },
  { path: '/tenders', component: TendersComponent, name: 'Tenders' },
  { path: '/tenders/:id', component: ReportComponent, name: 'Report' }
])
export class AppComponent implements OnInit {
  constructor(private router: Router) {
    appSettings.setString('URL', 'http://52.32.15.133:3000/geobra');
  }

  ngOnInit() {
    if (appSettings.hasKey('user') && appSettings.hasKey('TOKEN')) {
      this.router.navigate(['Tenders']);
    } else {
      this.router.navigate(['Login']);
    }
  }
}
