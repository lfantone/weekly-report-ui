// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { nativeScriptBootstrap } from 'nativescript-angular/application';
import { registerElement, ViewClass } from 'nativescript-angular/element-registry';
import { enableProdMode } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app.component';

const elements = [
  {
    name: 'PullToRefresh',
    resolver: () => require('nativescript-pulltorefresh').PullToRefresh
  },
  {
    name: 'DropwDown',
    resolver: () => require('nativescript-drop-down/drop-down').DropDown
  }
];

 enableProdMode();

nativeScriptBootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS], { startPageActionBarHidden: false })
  .then(() => {
    for (let i = 0; i < elements.length; i++) {
      console.log(`Registering ${elements[i].name}`);
      registerElement(elements[i].name, elements[i].resolver);
    }
  });
