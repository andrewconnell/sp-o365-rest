///<reference path="../../../tools/typings/tsd.d.ts" />
///<reference path="../../../tools/typings/app.d.ts" />

module adalO365CorsClient.shared {
  'use strict';

  /**
   * Interface for the app's settings.
   */
  export interface ISettings {
    baseSPUrl: string;
    baseOneDriveUrl: string;
    defaultSharePointHttpGetOptions: any;
    defaultO365HttpGetOptions: any;
  }
}