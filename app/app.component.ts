import {Component} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from 'nativescript-angular/router';
import {LoginComponent} from './login/login.component';
import {ReportComponent} from './report/report.component';

@Component({
  selector: 'evz-app',
  directives: [NS_ROUTER_DIRECTIVES],
  providers: [NS_ROUTER_PROVIDERS],
  template: '<page-router-outlet></page-router-outlet>'
})
@RouteConfig([
  { path: "/login", component: LoginComponent, name: 'Login', useAsDefault: true },
  { path: "/report", component: ReportComponent, name: 'Rogin' },
])
export class AppComponent {

}
