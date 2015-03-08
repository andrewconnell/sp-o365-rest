///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/app.d.ts" />

'use strict';

module adalO365CorsClient {

  /**
   * Global settings used in the app.
   */
  var adalSettings:shared.IAdalSettings = {
    tenant:       '[your-azure-ad-tenant-id-here]',
    clientId:     '[your-azure-ad-app-id-here]',
    aadEndpoints: {
      /* 'target endpoint to be called': 'target endpoint's resource ID'  */

      // sharepoint site containing lists
      'https://[your-tenant-here].sharepoint.com/_api/': 'https://[your-tenant-here].sharepoint.com',
      // o365 files api
      'https://[your-tenant-here]-my.sharepoint.com/_api/v1.0/me': 'https://[your-tenant-here]-my.sharepoint.com/'
    }
  };
  // register the setting as a constant
  angular.module('adalO365CorsClient').constant('adalSettings', adalSettings);

  /**
   * Configuration settings for ADAL authentication.
   *
   * @type {{baseSPUrl: string, baseOneDriveUrl: string, defaultHttpGetOptions: {headers: {Accept: string}}}}
   */
  var appSettings:shared.ISettings = {
    baseSPUrl:             'https://[your-tenant-here].sharepoint.com/_api/',
    baseOneDriveUrl:       'https://[your-tenant-here]-my.sharepoint.com/_api/v1.0/me/',
    defaultSharePointHttpGetOptions: {
      headers: {
        'Accept': 'application/json;odata=verbose'
      }
    },
    defaultO365HttpGetOptions: {
      headers: {
        'Accept': 'application/json;odata=verbose'
      }
    }

  };
  // register the setting as a constant
  angular.module('adalO365CorsClient').constant('appSettings', appSettings);

}
