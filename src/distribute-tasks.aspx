<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
    <%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
        <%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
            <%@ Import Namespace="Microsoft.SharePoint" %>
                <%@ Assembly Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
                    <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
                        <asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
                            Distribuere oppgaver
                        </asp:Content>
                        <asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
                            <script type="text/javascript" src="./lib/jquery/dist/jquery.min.js"></script>
                            <script type="text/javascript" src="./lib/office-ui-fabric/dist/js/jquery.fabric.min.js"></script>

                            <script type="text/javascript" src="./lib/spscripts/spscript.js"></script>
                            <script type="text/javascript" src="./lib/momentjs/min/moment.min.js"></script>
                            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.15.1/jquery.validate.min.js"></script>
                            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.15.1/additional-methods.min.js"></script>
                            <!-- Scripts -->
                            <link rel="stylesheet" href="https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css">
                            <link rel="stylesheet" href="https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css">

                            <link rel="stylesheet" href="./styles/custom.css" />
                            <script type="text/javascript">
                                var CheckBoxElements = document.querySelectorAll(".ms-CheckBox");
                                for (var i = 0; i < CheckBoxElements.length; i++) {
                                    new fabric['CheckBox'](CheckBoxElements[i]);
                                }
                            </script>
                            <style>
                                .ms-Dialog {
                                    display: none;
                                }
                                
                                .ms-Dialog-main {
                                    min-width: 400px;
                                }
                                
                                .ms-Dialog-button.ms-Dialog-button--close {
                                    display: block;
                                }
                                
                                .ms-Dialog-main input,
                                select {
                                    max-width: 370px;
                                }
                                
                                .ms-Dialog-main select {
                                    max-width: 370px;
                                }
                                
                                #items tr {
                                    height: 35px;
                                }
                                
                                #items .ms-DatePicker {
                                    margin-bottom: 0;
                                }
                                
                                #items .ms-DatePicker-event {
                                    left: 3px;
                                    bottom: 4px;
                                    font-size: 18px;
                                }
                                
                                .fa {
                                    font-size: 18px;
                                }
                                
                                #items .ms-TextField-field {
                                    min-width: 60px;
                                    text-align: left;
                                    width: 110px;
                                    padding-left: 25px;
                                }
                                
                                #items .textField-Quantity {
                                    padding-left: 5px;
                                    width: 80px;
                                    text-align: right;
                                    padding-right: 5px;
                                }
                                
                                .ms-SearchBox input {
                                    width: 270px;
                                }
                                
                                #ToolHeader,
                                #ToolButtons,
                                #SelectedProjectContainer,
                                #ToolStatusLabel,
                                #AddProductContainer {
                                    display: none;
                                }
                                
                                .ms-Callout {
                                    display: none;
                                    position: absolute;
                                    top: -39px;
                                    left: 50px;
                                }
                                
                                .ms-TextField--multiline {
                                    margin-bottom: 0;
                                }
                                
                                .ms-TextField--multiline textarea {
                                    padding: 10px !important;
                                    width: 100% !important;
                                    max-width: 500px !important;
                                    margin-top: 10px;
                                }
                                
                                .ms-Callout-actions {
                                    margin-top: 10px;
                                }
                            </style>


                        </asp:Content>
                        <asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
                            <!-- Header -->

                            <div id="SelectedProjectContainer" class="ms-Grid-row" data-step="1" data-intro="Her står det hvilket prosjekt du har valgt å bestille for...">
                                <h2 class="ms-font-xl ms-fontWeight-semibold">
                                    <span>Verktøy bb-tools-man</span>
                                </h2>
                            </div>

                            <div class="ms-font-m" id="ToolStatusLabel">
                                verktøystatus: Klar
                            </div>
                            <div id="InstallationPicker" class="ms-font-m">
                                <h4>Velg installasjoner</h4>
                                <div id="tool-installation-picker">


                                </div>
                            </div>

                            <div id="ToolHeader" class="ms-font-m">
                                <h4>Oppgavedetaljer</h4>
                                <form name="distribute-tasks-form" method="get" action="">
                                    <div id="distribute-tasks" class="ms-Grid-row">
                                        <div class="ms-Grid-col ms-u-md3">

                                            <div class="ms-DatePicker">
                                                <div class="ms-TextField">
                                                    <i class="ms-DatePicker-event ms-Icon ms-Icon--event"></i>


                                                    <input id="task-start-date" name="task-start-date" class="ms-TextField-field" type="text" placeholder="Velg dato" value="" required>
                                                </div>
                                                <div class="ms-DatePicker-monthComponents">
                                                    <span class="ms-DatePicker-nextMonth js-nextMonth"><i class="ms-Icon ms-Icon--chevronRight"></i></span>
                                                    <span class="ms-DatePicker-prevMonth js-prevMonth"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>
                                                    <div class="ms-DatePicker-headerToggleView js-showMonthPicker"></div>
                                                </div>
                                                <span class="ms-DatePicker-goToday js-goToday">Gå til i dag</span>
                                                <div class="ms-DatePicker-monthPicker">
                                                    <div class="ms-DatePicker-header">
                                                        <div class="ms-DatePicker-yearComponents"><span class="ms-DatePicker-nextYear js-nextYear"><i class="ms-Icon ms-Icon--chevronRight"></i></span>
                                                            <span class="ms-DatePicker-prevYear js-prevYear"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>
                                                        </div>
                                                        <div class="ms-DatePicker-currentYear js-showYearPicker"></div>
                                                    </div>
                                                    <div class="ms-DatePicker-optionGrid">
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="0">Jan</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="1">Feb</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="2">Mar</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="3">Apr</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="4">Mai</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="5">Jun</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="6">Jul</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="7">Aug</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="8">Sep</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="9">Okt</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="10">Nov</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="11">Des</span>
                                                    </div>
                                                </div>
                                                <div class="ms-DatePicker-yearPicker">
                                                    <div class="ms-DatePicker-decadeComponents"><span class="ms-DatePicker-nextDecade js-nextDecade"><i class="ms-Icon ms-Icon--chevronRight"></i></span>
                                                        <span class="ms-DatePicker-prevDecade js-prevDecade"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>
                                                    </div>
                                                </div>
                                                <span class="ms-TextField-description" style="margin-top: -7px;">Oppgave start</span>
                                            </div>
                                        </div>
                                        <div class="ms-Grid-col ms-u-md3">

                                            <div class="ms-DatePicker">
                                                <div class="ms-TextField">
                                                    <i class="ms-DatePicker-event ms-Icon ms-Icon--event"></i>


                                                    <input id="task-due-date" name="task-due-date" class="ms-TextField-field" type="text" placeholder="Velg dato" value="" required>
                                                </div>
                                                <div class="ms-DatePicker-monthComponents">
                                                    <span class="ms-DatePicker-nextMonth js-nextMonth"><i class="ms-Icon ms-Icon--chevronRight"></i></span>
                                                    <span class="ms-DatePicker-prevMonth js-prevMonth"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>
                                                    <div class="ms-DatePicker-headerToggleView js-showMonthPicker"></div>
                                                </div>
                                                <span class="ms-DatePicker-goToday js-goToday">Gå til i dag</span>
                                                <div class="ms-DatePicker-monthPicker">
                                                    <div class="ms-DatePicker-header">
                                                        <div class="ms-DatePicker-yearComponents"><span class="ms-DatePicker-nextYear js-nextYear"><i class="ms-Icon ms-Icon--chevronRight"></i></span>
                                                            <span class="ms-DatePicker-prevYear js-prevYear"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>
                                                        </div>
                                                        <div class="ms-DatePicker-currentYear js-showYearPicker"></div>
                                                    </div>
                                                    <div class="ms-DatePicker-optionGrid">
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="0">Jan</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="1">Feb</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="2">Mar</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="3">Apr</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="4">Mai</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="5">Jun</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="6">Jul</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="7">Aug</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="8">Sep</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="9">Okt</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="10">Nov</span>
                                                        <span class="ms-DatePicker-monthOption js-changeDate" data-month="11">Des</span>
                                                    </div>
                                                </div>
                                                <div class="ms-DatePicker-yearPicker">
                                                    <div class="ms-DatePicker-decadeComponents"><span class="ms-DatePicker-nextDecade js-nextDecade"><i class="ms-Icon ms-Icon--chevronRight"></i></span>
                                                        <span class="ms-DatePicker-prevDecade js-prevDecade"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>
                                                    </div>
                                                </div>
                                                <span class="ms-TextField-description" style="margin-top: -7px;">Oppgave slutt</span>
                                            </div>
                                        </div>
                                        <div class="ms-Grid-col ms-u-md3">
                                            <div class="ms-TextField  is-required">
                                                <input class="ms-TextField-field text-box single-line" id="task-title" name="task-title" type="text" value="" required />
                                                <span class="ms-TextField-description">Tittel</span>
                                            </div>
                                        </div>
                                        <div class="ms-Grid-col ms-u-md3">
                                            <div class="ms-TextField is-required">

                                                <textarea class="ms-TextField-description text-box" id="task-description" style="width: 100%;"></textarea>
                                                <span class="ms-TextField-description">Oppgavebeskrivelse</span>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                                <div class="ms-Grid">
                                    <div class="ms-Grid-row">
                                        <div class="ms-Grid-col ms-u-lg12">
                                            <div class="ms-font-su">Installasjoner</div>
                                            <div class="ms-Table">
                                                <div class="ms-Table-row" id="ms-table-selectedlocations">
                                                    <span class="ms-Table-cell ms-font-xl">Installasjon</span>
                                                    <span class="ms-Table-cell ms-font-xl">Tilordnet</span>
                                                    <span class="ms-Table-cell ms-font-xl">Url</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- START DIALOG -->
                                <div class="ms-Dialog ms-Dialog--sample">
                                    <div class="ms-Overlay ms-Overlay--dark"></div>
                                    <div class="ms-Dialog-main">
                                        <button onclick="CloseDialog();" type="button" class="ms-Dialog-button ms-Dialog-button--close js-DialogAction--close">
            <i class="ms-Icon ms-Icon--x"></i>
        </button>
                                        <div class="ms-Dialog-header">
                                            <p class="ms-Dialog-title">Add user</p>
                                        </div>
                                        <div class="ms-Dialog-inner">
                                            <div class="ms-Dialog-content">
                                                <div class="ms-TextField">
                                                    <label class="ms-Label">Search for user</label>
                                                    <input type="text" class="ms-TextField-field people-search" autocomplete="off">
                                                    <div class="ms-TextField-field valid selected-user-display" title="Klikk for å endre person"></div>
                                                    <input type="hidden" class="display-name" autocomplete="off">
                                                    <input type="hidden" class="user-principal" autocomplete="off">
                                                </div>
                                            </div>
                                            <div class="ms-Dialog-actions">
                                                <div class="ms-Dialog-actionsRight">
                                                    <button type="button" onclick="return tools.assignUserTask();" class="ms-Dialog-action ms-Button ms-Button--primary"> <span class="ms-Button-label">Tilordne oppgave</span></button>
                                                    <button type="button" onclick="CloseDialog();" class="ms-Dialog-action ms-Button"> <span class="ms-Button-label">Cancel</span> </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- END DIALOG -->



                                <script type="text/javascript" src="./dist/distribute-tasks.js"></script>


                        </asp:Content>
                        <asp:Content ContentPlaceHolderID="PlaceHolderLeftNavBar" runat="server" />
                        <asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" />