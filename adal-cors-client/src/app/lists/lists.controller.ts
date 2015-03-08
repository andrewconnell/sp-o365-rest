///<reference path="../../../tools/typings/tsd.d.ts" />
///<reference path="../../../tools/typings/app.d.ts" />

module adalO365CorsClient {
  'use strict';

  /**
   * @name: adalO365CorsClient.listsController
   *
   * Controller for the lists screen.
   */
  class ListsController {

    public lists = [];
    public sharePointSiteUrl = '';

    /** +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

    static $inject = ['appSettings', 'adalO365CorsClient.sharePointService'];
    constructor(private appSettings:shared.ISettings,
                private spService:adalO365CorsClient.SharePointService) {

      this.sharePointSiteUrl = this.appSettings.baseSPUrl.replace('/_api/', '');

      // load all lists
      this.loadSharePointLists();
    }

    /**
     * Load all SharePoint lists into the public array or lists.
     */
    public loadSharePointLists():void {
      this.spService.getAllLists(this.appSettings.baseSPUrl)
        .then((spLists:shared.ISpList[]) => {
          this.lists = spLists;
        });
    }
  }

  // register the controller with the Angular app
  angular.module('adalO365CorsClient').controller('adalO365CorsClient.listsController', ListsController);

}