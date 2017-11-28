
export interface EnvConfig {
  api?: string
; server?: string
; port?: string
; proto?: string
; urlAppContext?: string
; serverURL?: string
; buildPath: string
; readonly rootPath: string
; e2eConfigPath?: string
; unitsConfigPath?: string
}

/*
export class Config {

  public static DEBUG = {
    LEVEL_1: false, // .info only
    LEVEL_2: false, // .warn only
    LEVEL_3: false, // .error only
    LEVEL_4: false // .log + all the above
  };

  public static APP_ENV(): EnvConfig {
    try {
      return JSON.parse('<%= ENV_CONFIG %>');
    } catch (exp) {
      return {};
    }
  }

  // supported languages
  public static GET_SUPPORTED_LANGUAGES() {
    return [
      { code: 'en', title: 'English' },
      { code: 'es', title: 'Spanish' },
      { code: 'fr', title: 'French' },
      { code: 'ru', title: 'Russian' },
      { code: 'bg', title: 'Bulgarian' }
    ];
  }

  public static IS_DEBUG_MODE(): boolean {
    for (let key in Config.DEBUG) {
      if (Config.DEBUG[key]) {
        // if any level is on, debug mode is on
        return true;
      }
    }
    return false;
  }

  // reset debug defaults
  public static RESET() {
    for (let key in Config.DEBUG) {
      Config.DEBUG[key] = false;
    }
  }

} // ===== END OF CLASS =============
*/
