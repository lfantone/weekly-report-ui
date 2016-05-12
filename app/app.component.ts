import {Component, OnInit} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from 'nativescript-angular/router';
import {LoginComponent} from './login/login.component';
import {TendersComponent} from './tenders/tenders.component';

@Component({
  selector: 'evz-app',
  directives: [NS_ROUTER_DIRECTIVES],
  providers: [NS_ROUTER_PROVIDERS],
  template: '<page-router-outlet></page-router-outlet>'
})
@RouteConfig([
  { path: '/login', component: LoginComponent, name: 'Login' },
  { path: '/tenders', component: TendersComponent, name: 'Tenders' },
])
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['Login']);
  }
}
