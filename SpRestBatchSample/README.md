Sample SharePoint Hosted App that demonstrates how to do simple REST operations with the SharePoint 2013 REST API.

This demonstrates how to do simple CRUD operations but also demonstrates how to create batches of individual requests. Once SharePoint 2013 / Office 365 supports the OData `$batch` operator I will update it so it will use this performance improvement for adding, deleting and updating multiple records in one request.

Watch the browser console or use a HTTP debugging proxy like Fiddler to watch the traffic sent across.

> Note: for the update & delete operations to work, you must first insert drivers for all three teams first. No error checking has been added to ensure you only add one team's drivers once in the list.

Applies To:
-----------
- SharePoint 2013 On-premises (versions: RTM to present)
- Office 365 SharePont Online (versions: RTM to present)