///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/app.d.ts" />

'use strict';

(() : void => {

  // create the application
  var app = angular.module('adalO365CorsClient', [
    'ngRoute',
    'ngAnimate',
    'AdalAngular'
  ]);

  /**
   * Configure the application.
   */
  app.config(['$routeProvider', '$httpProvider', 'adalSettings', 'adalAuthenticationServiceProvider',
    ($routeProvider: ng.route.IRouteProvider,
      $httpProvider: ng.IHttpProvider,
      adalSettings: adalO365CorsClient.shared.IAdalSettings,
      adalProvider) : void => {

      // create the routes for the application
      adalO365CorsClient.Routes.configure($routeProvider);

      // setup the Azure AD security config
      adalO365CorsClient.Adal.configure($httpProvider, adalSettings, adalProvider);
    }]);

})();

