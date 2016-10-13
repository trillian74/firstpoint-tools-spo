<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
    <%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
        <%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
            <%@ Import Namespace="Microsoft.SharePoint" %>
                <%@ Assembly Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
                    <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
                        <asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
                            List Demo
                        </asp:Content>
                        <asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
                            <!-- Scripts -->
                            <script type="text/javascript" src="./lib/jquery/dist/jquery.js"></script>
                            <script type="text/javascript" src='//ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js'></script>
                            <script type="text/javascript" src="./lib/datatables/media/js/jquery.dataTables.js"></script>
                            <script type="text/javascript" src="./lib/datatables/media/js/dataTables.material.js"></script>
                            <script type="text/javascript" src="./lib/select2/dist/js/select2.full.js"></script>
                            <script type="text/javascript" src="./lib/lodash/dist/lodash.js"></script>
                            <script type="text/javascript" src="./lib/spscripts/spscript.js"></script>
                            <script type="text/javascript" src='./lib/jquery/dist/jquery.SPWidgets.js'></script>


                            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
                            <link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.blue_grey-indigo.min.css">
                            <script defer src="https://code.getmdl.io/1.2.1/material.min.js"></script>
                            <!-- CSS -->
                            <link rel="stylesheet" href="./lib/datatables/media/css/dataTables.material.css" />
                            <link rel="stylesheet" href="./lib/select2/dist/css/select2.css" />
                            <link rel="stylesheet" href="./styles/custom.css" />
                            <SharePoint:StyleBlock runat="server">
                                #contentBox { margin-left:20px; }
                            </SharePoint:StyleBlock>
                        </asp:Content>
                        <asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
                            <!-- Header -->
                            <div class="container mdl-layout__content mdl-color--grey-100">
                                <h1 class="page-header">Prosjekt verktøy</h1>
                                <select class="js-data-example-ajax" multiple="multiple"></select>
                                <div class="action-buttons"></div>
                                <section class="distribute-tasks">
                                    <div id="distribute-tasks-title" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <input class="mdl-textfield__input" type="text" id="distribute-task-title">
                                        <label class="mdl-textfield__label" for="distribute-task-title">Oppgavetekst</label>
                                    </div>
                                    <br />
                                    <div id="distribute-tasks-description" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <textarea class="mdl-textfield__input" type="text" rows="4" id="distribute-task-description"></textarea>
                                        <label class="mdl-textfield__label" for="distribute-task-description">Oppgavebeskrivelsen</label>
                                    </div>
                                    <table id="example" class="mdl-js-data-table mdl-data-table__cell--non-numeric" width="75%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <!--<th>Id</th>-->
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>AssignedTo</th>
                                                <th>ProjectSiteTitle</th>
                                                <th>ServerRelativeUrl</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <!--<th>Id</th>-->
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>AssignedTo</th>
                                                <th>ProjectSiteTitle</th>
                                                <th>ServerRelativeUrl</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </section>
                            </div>
                            </div>
                            <div id="itemForm" class="modal fade" tabindex="-1" role="dialog">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" onclick="tools.createItems();">BBTOOLSMAN</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="log"></div>
                            <!-- Scripts -->
                            <script type="text/javascript" src="./app/app.js"></script>
                        </asp:Content>
                        <asp:Content ContentPlaceHolderID="PlaceHolderLeftNavBar" runat="server" />
                        <asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" />