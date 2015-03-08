///<reference path="../../../tools/typings/tsd.d.ts" />
///<reference path="../../../tools/typings/app.d.ts" />

module adalO365CorsClient {
  'use strict';

  /**
   * @name: adalO365CorsClient.sharePointService
   *
   * SharePoint Angular service used to call the REST API.
   */
  export class SharePointService {

    static $inject = ['$http', '$q', 'appSettings'];
    constructor(private $http:ng.IHttpService,
                private $q:ng.IQService,
                private appSettings:shared.ISettings) {
    }

    /**
     * Get all all lists in the target SharePoint site.
     *
     * @param sharePointSiteApiUrl {string} URL of the REST API endpoint of the SharePoint site.
     * @returns {IPromise<adalO365CorsClient.shared.ISpList[]>}   Collection of all the lists in the specified SharePoint
     * site.
     */
    public getAllLists(sharePointSiteApiUrl:string) {
      var deferred = this.$q.defer();

      var endpoint = sharePointSiteApiUrl + 'web/lists?'
        + '$select=Id,Title,DefaultView/ServerRelativeUrl'
        + '&$expand=DefaultView'
        + '&$orderby=Title';

      // issue query for all sharepoint lists in specified site
      //
      // NOTE: because this is a cross domain REST call, the browser will first issue an HTTP OPTIONS request to check
      //       that the REST API supports CORS requests for specific HTTP methods
      this.$http.get(endpoint, this.appSettings.defaultSharePointHttpGetOptions)
        .then((result:shared.ISpListOdataResponse) => {
          var lists:shared.ISpList[] = result.data.d.results;
          deferred.resolve(lists);
        });

      return deferred.promise;
    }
  }

  // register the service with the Angular app
  angular.module('adalO365CorsClient').service('adalO365CorsClient.sharePointService', SharePointService);

}