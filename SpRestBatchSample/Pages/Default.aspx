<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
  <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
  <script type="text/javascript" src="../Scripts/knockout-3.2.0.js"></script>
  <script type="text/javascript" src="../Scripts/q.min.js"></script>
  <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
  <script type="text/javascript" src="/_layouts/15/sp.js"></script>
  <meta name="WebPartPageExpansion" content="full" />

  <!-- Add your CSS styles to the following file -->
  <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

  <!-- Add your JavaScript to the following file -->
  <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
  REST Batching Support
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

  <div>
    Jump to the <a href="../Lists/Drivers">Drivers list</a>.
  </div>

  <h1>Contents of the Driver's List</h1>
  <div>
    <input type="checkbox" data-bind="checked: submitAsBatch" />
    Submit requests using OData batches.

    <p></p>

    <input type="button" disabled="disabled"
      value="Get All Drivers"
      data-bind="click: getAllDrivers" />&nbsp;
    <input type="button" disabled="disabled"
      value="Delete All Drivers"
      data-bind="click: deleteAllDrivers" /><br />
    <input type="button" disabled="disabled"
      value="Add Mercedes Drivers"
      data-bind="click: function (data, event) { addDrivers('mercedes') }" />&nbsp;
    <input type="button" disabled="disabled"
      value="Add Ferrari Drivers"
      data-bind="click: function (data, event) { addDrivers('ferrari') }" />&nbsp;
    <input type="button" disabled="disabled"
      value="Add Red Bull Drivers"
      data-bind="click: function (data, event) { addDrivers('redbull') }" />
  </div>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Team</th>
          <th>Driver Name</th>
          <th>Created Date</th>
        </tr>
      </thead>
      <tbody data-bind="foreach: drivers">
        <tr>
          <td data-bind="text: ID"></td>
          <td><a data-bind="attr: { href: __metadata.uri }, text: Title"></a></td>
          <td data-bind="text: Team"></td>
          <td data-bind="text: Created"></td>
        </tr>
      </tbody>
    </table>
  </div>

</asp:Content>
