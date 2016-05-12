// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {AppComponent} from './app.component';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

nativeScriptBootstrap(AppComponent, [ROUTER_PROVIDERS], { startPageActionBarHidden: false });
