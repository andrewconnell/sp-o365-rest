///<reference path="../../../tools/typings/tsd.d.ts" />
///<reference path="../../../tools/typings/app.d.ts" />

module adalO365CorsClient.shared {
  'use strict';

  export interface IAadEndpoints {
    // can't define this as they are always different
  }

  /**
   * Interface for the ADAL settings.
   */
  export interface IAdalSettings {
    tenant: string;
    clientId: string;
    aadEndpoints: IAadEndpoints;
  }

}