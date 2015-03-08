///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/app.d.ts" />

module adalO365CorsClient {
  'use strict';

  export class Adal {
    /**
     * Configures ADAL JS with required info for the registered app in Azure AD.
     *
     * @param $httpProvider   Angular's $httpProvider (needed by ADAL)
     * @param adalSettings    Settings for ADAL
     * @param adalProvider    ADAL JS' Angular provider.
     */
    static configure($httpProvider:ng.IHttpProvider,
                     adalSettings:shared.IAdalSettings,
                     adalProvider:any):void {

      // init the ADAL service
      adalProvider.init({
          tenant:                adalSettings.tenant,
          clientId:              adalSettings.clientId,
          postLogoutRedirectUri: 'http://localhost:8000',
          endpoints:             adalSettings.aadEndpoints
        }, $httpProvider);
    }
  }

}