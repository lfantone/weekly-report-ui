
// angular
import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

// app
import {AppComponent} from './app.component';

bootstrap(AppComponent, [])
  .catch(err => console.error(err));
