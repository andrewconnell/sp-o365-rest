///<reference path="../../../tools/typings/tsd.d.ts" />
///<reference path="../../../tools/typings/app.d.ts" />

module adalO365CorsClient.shared {
  'use strict';

  /**
   * Actual results from an OData response for SharePoint lists.
   */
  interface ISpListOdataValue {
    results: ISpList[];
  }

  /**
   * Data object included in part of OData response for SharePoint lists.
   */
  interface ISpListOdataData {
    d: ISpListOdataValue;
  }

  /**
   * HTTP response from OData query for SPList's against SharePoint's REST API.
   */
  export interface ISpListOdataResponse extends ng.IHttpPromiseCallbackArg<any> {
    data: ISpListOdataData;
  }

  /** +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

  /**
   * Actual results from an OData response for Files using the Office 365 API.
   */
  interface IO365FileOdataValue {
    name: string;
    webUrl: string;
  }

  /**
   * Data object included in part of OData response for Office 365 Files API.
   */
  interface IO365FileOdataData {
    value: IO365FileOdataValue[];
  }

  /**
   * HTTP response from OData query for Files's against Office 365's Files API.
   */
  export interface IO365FileOdataResponse extends ng.IHttpPromiseCallbackArg<any> {
    data: IO365FileOdataData;
  }

}