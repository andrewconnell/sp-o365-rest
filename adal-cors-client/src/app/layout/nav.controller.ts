///<reference path="../../../tools/typings/tsd.d.ts" />
///<reference path="../../../tools/typings/app.d.ts" />

module adalO365CorsClient {
  'use strict';

  class NavContoller {

    public routes = [];

    /** +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

    static $inject = ['$route'];
    constructor(private $route:ng.route.IRouteService) {

      // load all visible routes
      this.loadVisibleRoutes();
    }

    /**
     * Load all routes for navigation.
     */
    public loadVisibleRoutes() {
      for (var route in this.$route.routes) {
        if (this.$route.routes[route].showInNav) {
          this.routes.push(this.$route.routes[route]);
        }
      }
    }
  }

  // register the controller with the Angular app
  angular.module('adalO365CorsClient').controller('adalO365CorsClient.navController', NavContoller);

}