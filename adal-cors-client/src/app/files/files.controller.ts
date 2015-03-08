///<reference path="../../../tools/typings/tsd.d.ts" />
///<reference path="../../../tools/typings/app.d.ts" />

module adalO365CorsClient {
  'use strict';

  class FilesController {

    public files = [];
    public oneDriveUrl = '';

    /** +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

    static $inject = ['appSettings', 'adalO365CorsClient.o365Service'];
    constructor(private appSettings:shared.ISettings,
                private o365Service:adalO365CorsClient.O365Service) {

      this.oneDriveUrl = this.appSettings.baseOneDriveUrl;

      // load all files
      this.getOneDriveFiles();
    }

    /**
     * Load all files from the user's OneDrive to the collection of files
     */
    public getOneDriveFiles() {
      this.o365Service.getUserFiles()
        .then((oneDriveFiles:shared.IFile[]) => {
          this.files = oneDriveFiles;
        });
    }
  }

  // register the controller with the Angular app
  angular.module('adalO365CorsClient').controller('adalO365CorsClient.filesController', FilesController);

}