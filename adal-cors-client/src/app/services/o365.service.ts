///<reference path="../../../tools/typings/tsd.d.ts" />
///<reference path="../../../tools/typings/app.d.ts" />

module adalO365CorsClient {
  'use strict';

  /**
   * Office 365 REST API Angular service.
   */
  export class O365Service {

    static $inject = ['$http', '$q', 'appSettings'];
    constructor(private $http:ng.IHttpService,
                private $q:ng.IQService,
                private appSettings) {
    }

    /**
     * Get all the user's files.
     *
     * @returns {IPromise<adalO365CorsClient.shared.IFile[]>}   Collection of all the current user's files.
     */
    public getUserFiles():ng.IPromise<adalO365CorsClient.shared.IFile[]> {
      var deferred = this.$q.defer();

      var endpoint = this.appSettings.baseOneDriveUrl + 'files/root/children?'
        + '$select=name,webUrl'
        + '&$orderby=name';

      // issue query to the Office 365 Files API
      //
      // NOTE: because this is a cross domain REST call, the browser will first issue an HTTP OPTIONS request to check
      //       that the REST API supports CORS requests for specific HTTP methods
      this.$http.get(endpoint, this.appSettings.defaultHttpGetOptions)
        .then((result:shared.IO365FileOdataResponse) => {
          console.log(result);
          var files:shared.IFile[] = result.data.value;
          deferred.resolve(files);
        });

      return deferred.promise;
    }
  }

  // register the service with the Angular app
  angular.module('adalO365CorsClient').service('adalO365CorsClient.o365Service', O365Service);

}