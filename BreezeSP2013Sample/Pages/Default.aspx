<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
  <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
  <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
  <script type="text/javascript" src="/_layouts/15/sp.js"></script>
  <meta name="WebPartPageExpansion" content="full" />

  <!-- breeze & dependent libraries -->
  <script type="text/javascript" src="../Scripts/q.js"></script>
  <script type="text/javascript" src="../Scripts/breeze.debug.js"></script>
  <script type="text/javascript" src="../Scripts/breeze.labs.dataservice.abstractrest.js"></script>
  <script type="text/javascript" src="../Scripts/breeze.labs.dataservice.sharepoint.js"></script>
  <script type="text/javascript" src="../Scripts/breeze.metadata-helper.js"></script>

  <!-- Add your CSS styles to the following file -->
  <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

  <!-- Add your JavaScript to the following file -->
  <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
  Breeze JS + SharePoint 2013 Sample
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

  <div>
    <input type="button" onclick="getAllItems();" value="Get All Contacts" disabled="disabled" />&nbsp;
    <input type="button" onclick="getOneItem();" value="Get One Contact" disabled="disabled"/>&nbsp;
    <input type="button" onclick="updateFirstItem();" value="Update Contact" disabled="disabled"/>&nbsp;
    <input type="button" onclick="createItem();" value="Create Contact" disabled="disabled"/>&nbsp;
    <input type="button" onclick="deleteItem();" value="Delete Contact" disabled="disabled"/>
  </div>
  <div id="results"></div>

</asp:Content>
