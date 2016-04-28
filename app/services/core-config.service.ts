interface IPlatforms {
  WEB: string;
  MOBILE_NATIVE: string;
}

export class CoreConfigService {

  // supported platforms
  public static PLATFORMS: IPlatforms = {
    WEB: 'web',
    MOBILE_NATIVE: 'mobile_native'
  };

  // current target (default to web)
  public static PLATFORM_TARGET: string = CoreConfigService.PLATFORMS.WEB;

  // convenient platform checks
  public static IS_WEB(): boolean {
    return CoreConfigService.PLATFORM_TARGET === CoreConfigService.PLATFORMS.WEB;
  }

  public static IS_MOBILE_NATIVE(): boolean {
    return CoreConfigService.PLATFORM_TARGET === CoreConfigService.PLATFORMS.MOBILE_NATIVE;
  }
}
