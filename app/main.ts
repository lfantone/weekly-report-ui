// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {AppComponent} from './app.component';
import {CoreConfigService} from './services/core-config.service';

CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.MOBILE_NATIVE;
nativeScriptBootstrap(AppComponent);
