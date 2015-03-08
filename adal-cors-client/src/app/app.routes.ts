///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/app.d.ts" />

module adalO365CorsClient {
  'use strict';

  export class Routes {
    /**
     * Configures the routes for the application.
     * @param $routeProvider
     */
    static configure($routeProvider:ng.route.IRouteProvider):void {
      var baseUrl = 'app/';

      $routeProvider
        .when('/', <shared.INavRoute>{
          templateUrl:    baseUrl + 'layout/dashboard.html',
          requireADLogin: false,   // unnecessary as default = false
          showInNav:      false
        })
        .when('/login', <shared.INavRoute>{
          title:          'Login',
          requireADLogin: true,    // unnecessary as default = false
          showInNav:      true
        })
        .when('/lists', <shared.INavRoute>{
          title:          'SharePoint Online REST API',
          controller:     'adalO365CorsClient.listsController',
          templateUrl:    baseUrl + 'lists/lists.html',
          controllerAs:   'vm',
          requireADLogin: true,
          showInNav:      true
        })
        .when('/files', <shared.INavRoute>{
          title:          'Office 365 Files REST API',
          controller:     'adalO365CorsClient.filesController',
          templateUrl:    baseUrl + 'files/files.html',
          controllerAs:   'vm',
          requireADLogin: true,
          showInNav:      true
        })
        .otherwise({redirectTo: '/'});
    }
  }

}
