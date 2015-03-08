
///<reference path="../../../tools/typings/tsd.d.ts" />
///<reference path="../../../tools/typings/app.d.ts" />

module adalO365CorsClient.shared {
  'use strict';

  /**
   * Interface return for a SharePoint list object.
   */
  export interface ISpList {
    Id?: string;
    Title?: string;
    DefaultView?: string;
  }

}