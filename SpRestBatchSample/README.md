Sample SharePoint Hosted App that demonstrates how to do simple REST operations with the SharePoint 2013 REST API.

This demonstrates how to do simple CRUD operations but also demonstrates how to create batches of individual requests. Checking the batch button on the page will force the app to use the OData `$batch` operator when adding, deleting & updating the drivers. This will issue a single HTTP request instead of a series of HTTP requests... a significant performance improvement!

Watch the browser console or use a HTTP debugging proxy like Fiddler to watch the traffic sent across.

> Note: for the update & delete operations to work, you must first insert drivers for all three teams first. No error checking has been added to ensure you only add one team's drivers once in the list.

Applies To:
-----------
- SharePoint 2013 On-premises (versions: *TBD*)
- Office 365 SharePont Online (versions: *TBD*)