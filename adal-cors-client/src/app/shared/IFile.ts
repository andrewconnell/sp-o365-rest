
///<reference path="../../../tools/typings/tsd.d.ts" />
///<reference path="../../../tools/typings/app.d.ts" />

module adalO365CorsClient.shared {
  'use strict';

  /**
   * Interface for a Office 365 API File object.
   */
  export interface IFile {
    id?: string;
    name?: string;
    webUrl?: string;
  }

}