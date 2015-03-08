///<reference path="../../../tools/typings/tsd.d.ts" />
///<reference path="../../../tools/typings/app.d.ts" />

module adalO365CorsClient.shared {
  'use strict';

  /**
   * Interface for navigation routes.
   */
  export interface INavRoute {
    title?:          string;
    controller?:     string;
    templateUrl?:    string;
    controllerAs?:   string;
    requireADLogin?: boolean;
    showInNav?:      boolean;
  }

}