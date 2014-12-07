(function () {
  'use strict';

  /**
   * View model used for the page in binding with knockout.js
   */
  var DriversModel = function () {
    var self = this;
    self.drivers = ko.observableArray([]);
    self.submitAsBatch = ko.observable(false);

    /**
     * @name getAllDrivers
     * @description 
     * Gets all drivers from the SharePoint 'Drivers' list & stuffs them into an observable array.
     */
    self.getAllDrivers = function () {
      console.log('getAllDrivers()');

      // build endpoint
      var endpoint = _spPageContextInfo.webAbsoluteUrl
                    + '/_api/web/lists/getbytitle(\'Drivers\')'
                    + '/items?$orderby=Title';

      var requestHeaders = {
        'Accept': 'application/json;odata=verbose'
      };

      // issue request
      return jQuery.ajax({
        url: endpoint,
        type: 'GET',
        headers: requestHeaders
      }
      ).done(function (response) {
        console.log(response);
        // clear the view model
        self.drivers([]);
        // set response > drivers collection
        self.drivers(response.d.results);
      });

    }

    /**
     * @name addDrivers
     * @description
     * Creates a JSON array of drivers to add to the SharePoint 'Drivers' list. 
     * 
     * @param {string} teamId - Name of the F1 team to add two drivers for (mercedes / ferrari / redbull).
     */
    self.addDrivers = function (teamId) {
      console.log('addDrivers()');

      var driversAsJson = undefined;

      switch (teamId) {
        // if mercedes.... GRRR
        case 'mercedes':
          driversAsJson = [
            {
              __metadata: {
                type: 'SP.Data.DriversListItem'
              },
              Title: 'Nico Rossberg',
              Team: 'Mercedes'
            },
            {
              __metadata: {
                type: 'SP.Data.DriversListItem'
              },
              Title: 'Lewis Hamilton',
              Team: 'Mercedes'
            }
          ];
          break;
          // if ferrari..... WOOT!
        case 'ferrari':
          driversAsJson = [
            {
              __metadata: {
                type: 'SP.Data.DriversListItem'
              },
              Title: 'Fernando Alonso',
              Team: 'Ferrari'
            },
            {
              __metadata: {
                type: 'SP.Data.DriversListItem'
              },
              Title: 'Filipe Massa',
              Team: 'Ferrari'
            }
          ];
          break;
          // if red bull.... BOOOO!
        case 'redbull':
          driversAsJson = [
            {
              __metadata: {
                type: 'SP.Data.DriversListItem'
              },
              Title: 'Sebastian Vettel',
              Team: 'Red Bull'
            },
            {
              __metadata: {
                type: 'SP.Data.DriversListItem'
              },
              Title: 'Mark Webber',
              Team: 'Red Bull'
            }
          ];
          break;
      }

      addTeamDrivers(driversAsJson);
    }

    /**
     * @name addTeamDrivers
     * @description
     * Takes a collection of drivers and adds them to the SharePoint 'Drivers' list.
     * This doesn't create the drivers, rather it calls other internal functions that create them using
     * a single batch request or multiple requests.
     * 
     * @param {Array{Object}} driversAsJson - JSON array of drivers to add.
     * 
     */
    function addTeamDrivers(driversAsJson) {
      console.log('addTeamDrivers()' + driversAsJson);

      // send single request or batch?
      if (self.submitAsBatch() === true) {
        addTeamDriversBatchRequest(driversAsJson);
      } else {
        addTeamDriverMultipleRequests(driversAsJson);
      }
    }

    /**
     * @name addTeamDriversBatchRequest
     * @description
     * Adds drivers in a single batch request.
     * 
     * @param {Array{Object}} driversAsJson - JSON array of drivers to add.
     */
    function addTeamDriversBatchRequest(driversAsJson) {
      console.log('addTeamDriversBatchRequest()', driversAsJson);


      // generate a batch boundary
      var batchGuid = generateUUID();

      // creating the body
      var batchContents = new Array();
      var changeSetId = generateUUID();

      // get current host
      var temp = document.createElement('a');
      temp.href = _spPageContextInfo.webAbsoluteUrl;
      var host = temp.hostname;

      // for each driver...
      for (var driverIndex = 0; driverIndex < driversAsJson.length; driverIndex++) {

        var driver = driversAsJson[driverIndex];

        // create the request endpoint
        var endpoint = _spPageContextInfo.webAbsoluteUrl
                       + '/_api/web/lists/getbytitle(\'Drivers\')'
                       + '/items';

        // create the changeset
        batchContents.push('--changeset_' + changeSetId);
        batchContents.push('Content-Type: application/http');
        batchContents.push('Content-Transfer-Encoding: binary');
        batchContents.push('');
        batchContents.push('POST ' + endpoint + ' HTTP/1.1');
        batchContents.push('Content-Type: application/json;odata=verbose');
        batchContents.push('');
        batchContents.push(JSON.stringify(driver));
        batchContents.push('');
      }
      // END changeset to create data
      batchContents.push('--changeset_' + changeSetId + '--');


      // generate the body of the batch
      var batchBody = batchContents.join('\r\n');

      // start with a clean array
      batchContents = new Array();

      // create batch for creating items
      batchContents.push('--batch_' + batchGuid);
      batchContents.push('Content-Type: multipart/mixed; boundary="changeset_' + changeSetId + '"');
      batchContents.push('Content-Length: ' + batchBody.length);
      batchContents.push('Content-Transfer-Encoding: binary');
      batchContents.push('');
      batchContents.push(batchBody);
      batchContents.push('');

      // create request in batch to get all items after all are created
      endpoint = _spPageContextInfo.webAbsoluteUrl
                    + '/_api/web/lists/getbytitle(\'Drivers\')'
                    + '/items?$orderby=Title';


      batchContents.push('--batch_' + batchGuid);
      batchContents.push('Content-Type: application/http');
      batchContents.push('Content-Transfer-Encoding: binary');
      batchContents.push('');
      batchContents.push('GET ' + endpoint + ' HTTP/1.1');
      batchContents.push('Accept: application/json;odata=verbose');
      batchContents.push('');

      batchContents.push('--batch_' + batchGuid + '--');

      batchBody = batchContents.join('\r\n');

      // create the batch
      console.debug(batchBody);

      // create the request endpoint 
      var endpoint = _spPageContextInfo.webAbsoluteUrl
                     + '/_api/$batch';

      // batches need a specific header
      var batchRequestHeader = {
        'X-RequestDigest': jQuery("#__REQUESTDIGEST").val(),
        'Content-Type': 'multipart/mixed; boundary="batch_' + batchGuid + '"'
      };

      // create request
      jQuery.ajax({
        url: endpoint,
        type: 'POST',
        headers: batchRequestHeader,
        data: batchBody,
        success: function (response) {
          console.log('.. create driver PASS ', response);

          var responseInLines = response.split('\n');

          // read each line until you find JSON...
          for (var currentLine = 0; currentLine < responseInLines.length; currentLine++) {
            try {
              // parse the JSON response...
              var tryParseJson = JSON.parse(responseInLines[currentLine]);

              // clear the view model
              self.drivers([]);
              // set response > drivers collection
              self.drivers(tryParseJson.d.results);

            } catch (e) {
              // don't do anything... just keep moving
            }
          }
        },
        fail: function (error) {
          console.log('.. create driver FAIL ', error);
        }
      });
    }

    /**
     * @name deleteDriversMultipleRequests
     * @description
     * Adds drivers in multiple HTTP requests (one per driver).
     *
     * @param {Array{Object}} driversAsJson - JSON array of drivers to add.
     */
    function addTeamDriverMultipleRequests(driversAsJson) {
      console.log('addTeamDriversMultipleRequests()', driversAsJson);

      // build request endpoint
      var endpoint = _spPageContextInfo.webAbsoluteUrl
                  + '/_api/web/lists/getbytitle(\'Drivers\')'
                  + '/items';

      // build common request headers
      var requestHeaders = {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose',
        'X-RequestDigest': jQuery("#__REQUESTDIGEST").val()
      };

      // will store requests in promise array
      var jobs = [];

      // loop through all drivers and create separate requests for each one...
      for (var driverIndex = 0; driverIndex < driversAsJson.length; driverIndex++) {

        // create request...
        var promise = jQuery.ajax({
          url: endpoint,
          type: 'POST',
          headers: requestHeaders,
          data: JSON.stringify(driversAsJson[driverIndex]),
          success: function (response) {
            console.log('.. add driver PASS ', response);
          },
          fail: function (error) {
            console.log('.. add driver FAIL ', error);
          }
        });

        // add the request to the collection of jobs
        console.log('.. create driver add request # ' + driverIndex);
        jobs.push(promise);
      }

      console.log('request jobs', jobs);

      // when all jobs are complete...
      Q.all(jobs)
        .then(function () {
          console.log('all requests finished');
          // refresh the collection
          self.getAllDrivers();
        });

    }

    /**
     * @name updateDrivers
     * @description
     * Updates the Ferrari & Red Bull teams > 2014 drivers.
     */
    self.updateDrivers = function () {
      console.log('updateDrivers()');

      var driverToUpdate = undefined;
      var driversToUpdate = [];

      // update ferrari
      driverToUpdate = self.drivers().filter(function (driver) {
        return (driver.Title == 'Filipe Massa');
      })[0];
      driverToUpdate.Title = 'Kimi Räikkönen';
      driversToUpdate.push(driverToUpdate);

      // update red bull
      driverToUpdate = self.drivers().filter(function (driver) {
        return (driver.Title == 'Mark Webber');
      })[0];
      driverToUpdate.Title = 'Daniel Ricciardo';
      driversToUpdate.push(driverToUpdate);


      // send single request or batch?
      if (self.submitAsBatch() === true) {
        updateTeamDriversBatchRequest(driversToUpdate);
      } else {
        updateTeamDriversMultipleRequests(driversToUpdate);
      }
    }

    /**
     * @name updateTeamDriversBatchRequest
     * @description
     * Submits the updates as a single batch request.
     * 
     * @param {Array{Object}} driversToUpdate - JSON array of drivers to update.
     */
    function updateTeamDriversBatchRequest(driversToUpdate) {
      console.log('updateTeamDriversBatchRequest()' + driversToUpdate);

      // generate a batch boundary
      var batchGuid = generateUUID();

      // creating the body
      var batchContents = new Array();
      var changeSetId = generateUUID();

      // get current host
      var temp = document.createElement('a');
      temp.href = _spPageContextInfo.webAbsoluteUrl;
      var host = temp.hostname;

      // for each driver...
      for (var driverIndex = 0; driverIndex < driversToUpdate.length; driverIndex++) {

        var driver = driversToUpdate[driverIndex];

        // convert driver > update object
        var driverUpdater = {
          __metadata: {
            'type': driver.__metadata.type
          },
          Title: driver.Title
        };

        // create the request endpoint
        var endpoint = _spPageContextInfo.webAbsoluteUrl
                       + '/_api/web/lists/getbytitle(\'Drivers\')'
                       + '/items(' + driver.Id + ')';

        // create the changeset
        batchContents.push('--changeset_' + changeSetId);
        batchContents.push('Content-Type: application/http');
        batchContents.push('Content-Transfer-Encoding: binary');
        batchContents.push('');
        batchContents.push('PATCH ' + endpoint + ' HTTP/1.1');
        batchContents.push('Content-Type: application/json;odata=verbose');
        batchContents.push('Accept: application/json;odata=verbose');
        batchContents.push('If-Match: ' +driver.__metadata.etag);
        batchContents.push('');
        batchContents.push(JSON.stringify(driverUpdater));
        batchContents.push('');
      }
      // END changeset to update data
      batchContents.push('--changeset_' + changeSetId + '--');


      // generate the body of the batch
      var batchBody = batchContents.join('\r\n');

      // start with a clean array
      batchContents = new Array();

      // create batch for update items
      batchContents.push('--batch_' + batchGuid);
      batchContents.push('Content-Type: multipart/mixed; boundary="changeset_' + changeSetId + '"');
      batchContents.push('Content-Length: ' + batchBody.length);
      batchContents.push('Content-Transfer-Encoding: binary');
      batchContents.push('');
      batchContents.push(batchBody);
      batchContents.push('');

      // create request in batch to get all items after all are deleted
      endpoint = _spPageContextInfo.webAbsoluteUrl
                    + '/_api/web/lists/getbytitle(\'Drivers\')'
                    + '/items?$orderby=Title';


      batchContents.push('--batch_' + batchGuid);
      batchContents.push('Content-Type: application/http');
      batchContents.push('Content-Transfer-Encoding: binary');
      batchContents.push('');
      batchContents.push('GET ' + endpoint + ' HTTP/1.1');
      batchContents.push('Accept: application/json;odata=verbose');
      batchContents.push('');

      batchContents.push('--batch_' + batchGuid + '--');

      batchBody = batchContents.join('\r\n');

      // create the batch
      console.debug(batchBody);

      // create the request endpoint 
      var endpoint = _spPageContextInfo.webAbsoluteUrl
                     + '/_api/$batch';

      // batches need a specific header
      var batchRequestHeader = {
        'X-RequestDigest': jQuery("#__REQUESTDIGEST").val(),
        'Content-Type': 'multipart/mixed; boundary="batch_' + batchGuid + '"'
      };

      // create request
      jQuery.ajax({
        url: endpoint,
        type: 'POST',
        headers: batchRequestHeader,
        data: batchBody,
        success: function (response) {
          console.log('.. delete driver PASS ', response);

          var responseInLines = response.split('\n');

          // read each line until you find JSON...
          for (var currentLine = 0; currentLine < responseInLines.length; currentLine++) {
            try {
              // parse the JSON response...
              var tryParseJson = JSON.parse(responseInLines[currentLine]);

              // clear the view model
              self.drivers([]);
              // set response > drivers collection
              self.drivers(tryParseJson.d.results);

            } catch (e) {
              // don't do anything... just keep moving
            }
          }
        },
        fail: function (error) {
          console.log('.. update driver FAIL ', error);
        }
      });
    }

    /**
     * @name updateTeamDriversMultipleRequests
     * @description
     * Submits the updates in multiple requests (one per update).
     * 
     * @param {Array{Object}} driversToUpdate - JSON array of drivers to update.
     */
    function updateTeamDriversMultipleRequests(driversToUpdate) {
      console.log('updateTeamDriversMultipleRequest()' + driversToUpdate);

      // store all jobs
      var jobs = [];

      for (var driverIndex = 0; driverIndex < driversToUpdate.length; driverIndex++) {

        var driver = driversToUpdate[driverIndex];

        var requestHeaders = {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose',
          'X-RequestDigest': jQuery("#__REQUESTDIGEST").val(),
          'X-Http-Method': 'MERGE',
          'If-Match': driver.__metadata.etag
        };

        // create the request endpoint
        var endpoint = _spPageContextInfo.webAbsoluteUrl
          + '/_api/web/lists/getbytitle(\'Drivers\')'
          + '/items(' + driver.Id + ')';

        // convert driver > update object
        var driverUpdater = {
          __metadata: {
            'type': driver.__metadata.type
          },
          Title: driver.Title
        };

        // create request...
        var promise = jQuery.ajax({
          url: endpoint,
          type: 'POST',
          headers: requestHeaders,
          data: JSON.stringify(driverUpdater),
          success: function (response) {
            console.log('.. update driver PASS ', response);
          },
          fail: function (error) {
            console.log('.. update driver FAIL ', error);
          }
        });

        // add the request to the collection of jobs
        console.log('.. created driver update request # ' + driverIndex);
        jobs.push(promise);
      }

      // when all jobs are complete...
      Q.all(jobs)
        .then(function () {
          console.log('all requests finished');
          // refresh the collection
          self.getAllDrivers();
        });
    }

    /**
     * @name deleteAllDrivers
     * @description
     * Based on the flag if batches should be used, deletes all the drivers from the SharePoint 'Drivers
     * list using multiple HTTP requests or a single batch request.
     */
    self.deleteAllDrivers = function () {
      // send single request or batch?
      if (self.submitAsBatch() === true) {
        deleteDriversBatchRequest();
      } else {
        deleteDriversMultipleRequests();
      }
    }

    /**
     * @name deleteDriversBatchRequest
     * @description
     * Deletes all drivers in a single HTTP request.
     */
    function deleteDriversBatchRequest() {
      console.log('deleteDriversBatchRequest()');

      // generate a batch boundary
      var batchGuid = generateUUID();

      // creating the body
      var batchContents = new Array();
      var changeSetId = generateUUID();

      // get current host
      var temp = document.createElement('a');
      temp.href = _spPageContextInfo.webAbsoluteUrl;
      var host = temp.hostname;

      // for each driver...
      for (var driverIndex = 0; driverIndex < self.drivers().length; driverIndex++) {

        var driver = self.drivers()[driverIndex];

        // create the request endpoint
        var endpoint = _spPageContextInfo.webAbsoluteUrl
                       + '/_api/web/lists/getbytitle(\'Drivers\')'
                       + '/items(' + driver.Id + ')';

        // create the changeset
        batchContents.push('--changeset_' + changeSetId);
        batchContents.push('Content-Type: application/http');
        batchContents.push('Content-Transfer-Encoding: binary');
        batchContents.push('');
        batchContents.push('DELETE ' + endpoint + ' HTTP/1.1');
        batchContents.push('If-Match: *');

        batchContents.push('');
      }
      // END changeset to delete data
      batchContents.push('--changeset_' + changeSetId + '--');


      // generate the body of the batch
      var batchBody = batchContents.join('\r\n');

      // start with a clean array
      batchContents = new Array();

      // create batch for deleting items
      batchContents.push('--batch_' + batchGuid);
      batchContents.push('Content-Type: multipart/mixed; boundary="changeset_' + changeSetId + '"');
      batchContents.push('Content-Length: ' + batchBody.length);
      batchContents.push('Content-Transfer-Encoding: binary');
      batchContents.push('');
      batchContents.push(batchBody);
      batchContents.push('');

      // create request in batch to get all items after all are deleted
      endpoint = _spPageContextInfo.webAbsoluteUrl
                    + '/_api/web/lists/getbytitle(\'Drivers\')'
                    + '/items?$orderby=Title';


      batchContents.push('--batch_' + batchGuid);
      batchContents.push('Content-Type: application/http');
      batchContents.push('Content-Transfer-Encoding: binary');
      batchContents.push('');
      batchContents.push('GET ' + endpoint + ' HTTP/1.1');
      batchContents.push('Accept: application/json;odata=verbose');
      batchContents.push('');

      batchContents.push('--batch_' + batchGuid + '--');

      batchBody = batchContents.join('\r\n');

      // create the batch
      console.debug(batchBody);

      // create the request endpoint 
      var endpoint = _spPageContextInfo.webAbsoluteUrl
                     + '/_api/$batch';

      // batches need a specific header
      var batchRequestHeader = {
        'X-RequestDigest': jQuery("#__REQUESTDIGEST").val(),
        'Content-Type': 'multipart/mixed; boundary="batch_' + batchGuid + '"'
      };

      // create request
      jQuery.ajax({
        url: endpoint,
        type: 'POST',
        headers: batchRequestHeader,
        data: batchBody,
        success: function (response) {
          console.log('.. delete driver PASS ', response);

          var responseInLines = response.split('\n');

          // read each line until you find JSON...
          for (var currentLine = 0; currentLine < responseInLines.length; currentLine++) {
            try {
              // parse the JSON response...
              var tryParseJson = JSON.parse(responseInLines[currentLine]);

              // clear the view model
              self.drivers([]);
              // set response > drivers collection
              self.drivers(tryParseJson.d.results);

            } catch (e) {
              // don't do anything... just keep moving
            }
          }
        },
        fail: function (error) {
          console.log('.. delete driver FAIL ', error);
        }
      });
    }

    /**
     * @name deleteDriversMultipleRequests
     * @description
     * Deletes all drivers using multiple HTTP requests (one per driver).
     */
    function deleteDriversMultipleRequests() {
      console.log('deleteDriversMultipleRequests()');

      // store all jobs
      var jobs = [];

      var requestHeaders = {
        'Accept': 'application/json;odata=verbose',
        'X-RequestDigest': jQuery("#__REQUESTDIGEST").val(),
        'If-Match': '*'
      };

      for (var driverIndex = 0; driverIndex < self.drivers().length; driverIndex++) {

        var driver = self.drivers()[driverIndex];

        // create the request endpoint
        var endpoint = _spPageContextInfo.webAbsoluteUrl
                       + '/_api/web/lists/getbytitle(\'Drivers\')'
                       + '/items(' + driver.Id + ')';

        // create request...
        var promise = jQuery.ajax({
          url: endpoint,
          type: 'DELETE',
          headers: requestHeaders,
          success: function (response) {
            console.log('.. delete driver PASS ', response);
          },
          fail: function (error) {
            console.log('.. delete driver FAIL ', error);
          }
        });

        // add the request to the collection of jobs
        console.log('.. created driver delete request # ' + driverIndex);
        jobs.push(promise);
      }

      // when all jobs are complete...
      Q.all(jobs)
        .then(function () {
          console.log('all requests finished');
          // refresh the collection
          self.getAllDrivers();
        });
    }

  }

  /*
   * @name generateUUID
   * @description
   * Generates a GUID-like string, used in OData HTTP batches.
   * 
   * @returns {string} - A GUID-like string.
   */
  function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
  };

  /**
   * Attach the view model to the page & enable all buttons.
   */
  jQuery(document).ready(function () {
    // create & bind the view model it to the page
    ko.applyBindings(new DriversModel());

    // enable all buttons now that the scripts have loaded & view model is bound
    jQuery('input[type="button"]').removeAttr('disabled');
  });
})();