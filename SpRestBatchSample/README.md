Sample SharePoint Hosted App that demonstrates how to do simple REST operations with the SharePoint 2013 REST API.

For an explanation on how batching works, see these two blog posts:
- [Part 1 - SharePoint REST API Batching - Understanding Batching Requests](http://www.andrewconnell.com/blog/part-1-sharepoint-rest-api-batching-understanding-batching-requests)
- [Part 2 - SharePoint REST API Batching - Exploring Batch Requests, Responses and Changesets](http://www.andrewconnell.com/blog/part-2-sharepoint-rest-api-batching-exploring-batch-requests-responses-and-changesets)

This demonstrates how to do simple CRUD operations but also demonstrates how to create batches of individual requests. Checking the batch button on the page will force the app to use the OData `$batch` operator when adding, deleting & updating the drivers. This will issue a single HTTP request instead of a series of HTTP requests... a significant performance improvement!

Watch the browser console or use a HTTP debugging proxy like Fiddler to watch the traffic sent across.

> Note: for the update & delete operations to work, you must first insert drivers for all three teams first. No error checking has been added to ensure you only add one team's drivers once in the list.

Applies To:
-----------
- SharePoint 2013 On-premises (versions: *TBD*)
- Office 365 SharePont Online (versions: *TBD*)

Known Issues:
----
- The batch response coming back from SharePoint's REST API is not including changeset references as per the OData [v3.0](http://www.odata.org/documentation/odata-version-3-0/batch-processing/) & [v4.0 spec](http://docs.oasis-open.org/odata/odata/v4.0/errata01/os/complete/part1-protocol/odata-v4.0-errata01-os-part1-protocol-complete.html#_Toc399426860) indicate that it should. However the order of the responses coming back from the batch request match the order of the requests in the initial batch request.

[![Analytics](https://ga-beacon.appspot.com/UA-59891462-1/sp-0365-rest/SpRestBatchSample)](https://github.com/igrigorik/ga-beacon)