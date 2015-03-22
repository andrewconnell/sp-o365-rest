<%@ Page MasterPageFile="~masterurl/default.master" %>

<asp:Content runat="server" ContentPlaceHolderID="PlaceHolderAdditionalPageHead">
  <script type="text/javascript" src="../Scripts/jquery-2.1.3.js"></script>
  <script type="text/javascript" src="../Scripts/q.js"></script>
  <script type="text/javascript" src="../Scripts/breeze.debug.js"></script>
  <script type="text/javascript" src="../Scripts/breeze.labs.dataservice.abstractrest.js"></script>
  <script type="text/javascript" src="../Scripts/breeze.labs.dataservice.sharepoint.js"></script>
  <script type="text/javascript" src="../Scripts/breeze.metadata-helper.js"></script>
  
  <script type="text/javascript" src="App.js"></script>
</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea">
  Breeze JS + SharePoint 2010 Sample
</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="PlaceHolderMain">
  <div>
    <input type="button" onclick="getAllItems();" value="Get All Contacts" disabled="disabled" />&nbsp;
    <input type="button" onclick="getOneItem();" value="Get One Contact" disabled="disabled" />&nbsp;
    <input type="button" onclick="updateFirstItem();" value="Update Contact" disabled="disabled" />&nbsp;
    <input type="button" onclick="createItem();" value="Create Contact" disabled="disabled" />&nbsp;
    <input type="button" onclick="deleteItem();" value="Delete Contact" disabled="disabled" />
  </div>
  <div id="results"></div>
</asp:Content>
