import {CoreConfigService} from './core-config.service';

export class ViewBrokerService {

  public static TEMPLATE_URL(path: string): string {
    if (CoreConfigService.IS_MOBILE_NATIVE()) {
      path = path.slice(1); // remove leading '.'
      return `./frameworks/nativescript.framework${path}`; // this can be any path to your {N} views
    } else {
      return path;
    }
  }
}
