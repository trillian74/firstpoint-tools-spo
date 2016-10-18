'use strict';

var webAbsoluteUrl = _spPageContextInfo.webAbsoluteUrl;
var doSearch;

$(function() {
    "use strict";
    // Enable NavBar functionallity
    var sHero = new SuperHero("Ole Han", "Super strength");
    sHero.danger();
    var tools = new BBTOOLSMAN();
    tools.consoleMe();
    InitDatePicker($("#ToolHeader .ms-DatePicker"));
    AddInstallations(tools);
    ShowForm();
    // Remove user container
    $("body").click(function() {
        $(".user-results-container").remove();
    });

    // People Search
    $(".people-search").keypress(function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            tools.selectUser($(".user-item-selected"));
        }
    });

    $(".people-search").keyup(function(e) {
        if (e.keyCode === 38) {
            e.preventDefault();
            UserSelectMove("up", $(this));
        } else if (e.keyCode === 40) {
            e.preventDefault();
            UserSelectMove("down", $(this));
        } else {
            TriggerSearchUsers($(this), tools);
        }
    });

    $(".selected-user-display").click(function() {
        RemovePeoplePickerValue($(this));
    });

    $(".people-search").change(function() {
        // Check input( $( this ).val() ) for validity here
        $("input:blank:not(:hidden)")
            .each(function() {
                $(this).css("background-color", "#d83b01");
                $(this).css("color", "#fff");
            })
            .get();
        $("input:filled:not(:hidden)").each(function() {
            $(this).css("background-color", "rgba( 255,255,255,0.85 )");
            $(this).css("color", "#767676");
        }).get();
    });

    $("input[type='text']").change(function() {
        // Check input( $( this ).val() ) for validity here
        $("input:blank:not(:hidden)")
            .each(function() {
                if (this.name.indexOf('task-') !== -1) {
                    $(this).css("background-color", "#d83b01");
                    $(this).css("color", "#fff");
                }
            })
            .get();
        $("input:filled:not(:hidden)").each(function() {
            if (this.name.indexOf('task-') !== -1) {
                $(this).css("background-color", "rgba( 255,255,255,0.85 )");
                $(this).css("color", "#767676");
            }
        }).get();
    });
    tools.consoleMe();

    function RemovePeoplePickerValue(element) {
        element.hide();

        // Reset values
        element
            .parent()
            .find("input[type='text']")
            .show()
            .focus()
            .select();
        element
            .parent()
            .parent()
            .find("input[type='hidden']")
            .val("");
    }

    function ShowAddUser(id) {

        tools.currentId = id;
        var filteredInputs = $("input:blank:not(:hidden)").map(function() {
            if (this.name.indexOf('task-') !== -1) {
                $(this).css("background-color", "#d83b01");
                $(this).css("color", "#fff");
                return this.id;
            }

        }).get();

        if (filteredInputs.length > 0) {
            alert("Fyll inn de nødvendige feltene markert med rødt.")
        } else {
            $(".ms-Dialog").show();
            $("#closeAssignUserTaskButton").click(function() {
                CloseDialog();
            })
            $("#assignUserTaskButton").click(function() {
                tools.assignUserTask();
            })
            $(".people-search").focus();
        }
        e = window.event;
        var asdf = e.target || e.srcElement;
        if (e.preventDefault)
            e.preventDefault();
        else
            e.returnValue = false; //IE<9

    }

    function TriggerSearchUsers(element, ctx) {
        if (element.val().length === 0) {
            return;
        }

        clearTimeout(doSearch);
        doSearch = setTimeout(function() {
            tools.searchForUsers(element);
        }, 250);
    }

    function MoveUp(element) {
        var input = element
            .closest(".ms-Grid-row")
            .prev()
            .find("input");

        if (input.length >= 1) {
            input
                .focus()
                .select();
        } else {
            input = element
                .closest(".ms-Grid-row")
                .prev()
                .prev()
                .find("input");

            if (input.length >= 1) {
                input
                    .focus()
                    .select();
            }
        }
    }

    function MoveDown(element) {
        var input = element
            .closest(".ms-Grid-row")
            .next()
            .find("input");

        if (input.length >= 1) {
            input
                .focus()
                .select();
        } else {
            input = element
                .closest(".ms-Grid-row")
                .next()
                .next()
                .find("input");

            if (input.length >= 1) {
                input
                    .focus()
                    .select();
            }
        }
    }

    function UserSelectMove(direction, element) {
        element.select();

        var userContainer = $(".user-results-container");
        var selectedUser = $(".user-item-selected");
        //var users = $(".user-item");

        selectedUser.removeClass("user-item-selected");

        if (selectedUser.length === 0) {
            if (direction === "down") {
                userContainer
                    .find(".user-item:first")
                    .addClass("user-item-selected");
            } else {
                userContainer
                    .find(".user-item:last")
                    .addClass("user-item-selected");
            }
        } else {
            if (direction === "down") {
                var next = selectedUser.next();

                if (next.length === 1) {
                    next.addClass("user-item-selected");
                } else {
                    userContainer
                        .find(".user-item:first")
                        .addClass("user-item-selected");
                }
            } else {
                var prev = selectedUser.prev();

                if (prev.length === 1) {
                    prev.addClass("user-item-selected");
                } else {
                    userContainer
                        .find(".user-item:last")
                        .addClass("user-item-selected");
                }
            }
        }
    }

    // function BBTOOLSMAN() {     this.Title = 'bb-tools-man';     this.locations =
    // [];     this.SelectedSites = [];     this.currentId = "";     this.Sites =
    // [];     console.log('bb-tools-man instantiated'); };

    var AddEditOnTables = function(model) {
        $("#items > tbody > tr > td:not(.no-row-click)")
            .click(function() {
                if ($(this).hasClass("ms-Table-rowCheck")) {
                    return;
                }

                var id = $(this)
                    .parent()
                    .prop("id")
                    .replace("itemId_", "");
                window.location.href = "/" + model + "/Edit/" + id;
            });
    };

    var AddCustomEditOnTables = function(editFunction) {
        $("#items > tbody > tr > td:not(.no-row-click)")
            .click(function() {
                if ($(this).hasClass("ms-Table-rowCheck")) {
                    return;
                }

                editFunction($(this));
            });
    };

    var GetQueryStringParameter = function(paramToRetrieve) {
        try {
            var params = document
                .URL
                .split("?")[1]
                .split("&");

            for (var i = 0; i < params.length; i = i + 1) {
                var singleParam = params[i].split("=");
                if (singleParam[0] == paramToRetrieve)
                    return singleParam[1];
            }

            return "";
        } catch (e) {
            return "";
        }
    };

    var stripTableContentAndAppendToTable = function(html) {
        var tableRows = $(html)
            .find("td")
            .parent();

        if (tableRows.length === 0) {
            $(".load-more").hide();
            return;
        }

        $("#items tbody").append(tableRows.parent().html());
    };

    var ValidateDatePickerInput = function(element) {
        element.css("bTool", "1px #767676 solid");

        if (element.val().trim().length > 0) {
            var split = element
                .val()
                .split(".");
            var tempDate = new Date(split[2], parseInt(split[1]) - 1, parseInt(split[0]));

            if (isNaN(tempDate.getTime())) { // d.valueOf() could also work
                element.css("bTool", "2px red solid");
                element.focus();
            }
        }
    };

    var FormatNumericInput = function(num) {
        var culture = $("#Culture").val();

        if (culture.toLowerCase().indexOf("nb-") >= 0) {
            return num.replace(".", ",");
        } else {
            return num.replace(",", ".");
        }
    };
});

class BBTOOLSMAN {
    constructor() {
        this.Title = 'bb-tools-man';
        this.locations = [];
        this.SelectedSites = [];
        this.currentId = "";
        this.Sites = [];
        console.log('bb-tools-man instantiated');
    }
    ShowAddUser(id) {
        tools.currentId = id;
        event.preventDefault();
        var filteredInputs = $("input:blank:not(:hidden)").map(function() {
            if (this.name.indexOf('task-') !== -1) {
                $(this).css("background-color", "#d83b01");
                $(this).css("color", "#fff");
                return this.id;
            }

        }).get();

        if (filteredInputs.length > 0) {
            alert("Fyll inn de nødvendige feltene markert med rødt.")
        } else {
            $(".ms-Dialog").show();
            $(".people-search").focus();
        }

    }
    removePeoplePickerValue(element) {
        element.hide();

        // Reset values
        element
            .parent()
            .find("input[type='text']")
            .show()
            .focus()
            .select();
        element
            .parent()
            .parent()
            .find("input[type='hidden']")
            .val("");
    }
    setPeoplePickerValue(picker, displayName, userPrincipalName) {
        // Set displayName
        picker
            .find(".selected-user-display")
            .html("<i class='ms-Icon ms-Icon--x' aria-hidden='true'></i>" + displayName)
            .show();

        // Set Values
        picker
            .find(".display-name")
            .val(displayName);
        picker
            .find(".user-principal")
            .val(userPrincipalName);

        // Hide people search
        picker
            .find("input[type='text']")
            .hide();

        // Hide the search results container
        $(".user-results-container").remove();
    }
    selectUser(element) {
        var container = element
            .parent()
            .parent();
        var displayName = element
            .text()
            .trim();
        var userPrincipal = element
            .find("input")
            .val();

        this.setPeoplePickerValue(container, displayName, userPrincipal);
    }
    searchForUsers(element) {
        var dao = new SPScript.RestDao();

        dao
            .search
            .people(element[0].value)
            .then(function(result) {
                $(".user-results-container").remove();

                var html = "<div class='ms-font-s user-results-container'>";

                $.each(result.items, function(index, user) {
                    html += "<div class='user-item'>" + user.PreferredName + " (<i> Tittel: " + user.JobTitle + ")</i><input type='hidden' value='" + user.AccountName + "'>  </div>";
                });

                html += "</div>";
                element.after(html);

                $(".user-item").click(function() {
                    tools.selectUser($(this));
                });
            });
    }

    addLocation(item) {
        var index = this
            .locations
            .findIndex(function(o) {
                // if(o.Id === item.params.data.Id)
                return o.Id === item.id;
            }) || -1;
        (index === -1) ?
        this
            .locations
            .push({ Id: item.id, Title: item.title }): this
            .locations
            .splice(index, 1);
        // this     .locations     .map(function(obj) {         console.log('locations['
        // + obj.Id + '] = ' + obj.Title);     });
        $("#ms-table-selectedlocations").after(this.addInstallationRow({ Id: item.id, Title: item.title, AssignedTo: null }));
    }
    removeLocation(item) {
        var index = this
            .locations
            .findIndex(function(o, i) {
                // console.log(i);
                return o.Id === item.id;
            });
        this.deleted = this
            .locations
            .splice(index, 1);
        // this     .locations     .map(function(obj) {         console.log('locations['
        // + obj.Id + '] = ' + obj.Title);     });
        this.removeInstallationRow("." + item.id);
    }
    GetUserId(accountName) {
        return new Promise(function(resolve, reject) {
            /// get the site url
            var siteUrl = _spPageContextInfo.siteAbsoluteUrl;

            /// make an ajax call to get the site user
            $.ajax({
                url: siteUrl + "/_api/web/siteusers(@v)?@v='" + encodeURIComponent(accountName) + "'",
                method: "GET",
                headers: {
                    "Accept": "application/json; odata=verbose"
                },
                success: function(data) {
                    ///popup user id received from site users.
                    console.log("Received UserId" + data.d.Id);
                    resolve(JSON.stringify(data.d.Id));
                },
                error: function(data) {
                    console.log(JSON.stringify(data));
                    reject(JSON.stringify(data));
                }
            });
        });
    }
    assignUserTask() {
        // Validere felter. Hent verdier fra raden og post en oppgave til listen for den
        // gjeldende side. avslutt med å fjerne raden... kanskje en toast...
        var filteredInputs = $("input:blank").map(function() {
            if (this.className.indexOf('ms-TextField-field people-search') !== -1) {
                return this.id;
            }

        }).get();

        if (filteredInputs.length !== 0) {
            alert("Oppgaven må ha en tilordnet person.");
        } else {
            var row = $("." + this.currentId);
            var user = this
                .GetUserId($(".user-principal").attr("value"))
                .then(function(id) {
                    console.log("goahead create task");
                    var dao = new SPScript.RestDao();
                    if (tools.Sites.length === 0) {
                        dao
                            .web
                            .subsites()
                            .then(function(sites) {
                                tools.Sites = sites;
                                var sitedetails = $.map(sites, function(site) {
                                    if (tools.currentId === site.Id) {
                                        return site;
                                    }
                                });

                                var newItem = {
                                    Title: $("#task-title").val(),
                                    Body: $("#task-description").val(),
                                    StartDate: moment($("#task-start-date").val(), "DD.MM.YYYY"),
                                    DueDate: moment($("#task-due-date").val(), "DD.MM.YYYY"),
                                    GtProjectPhase: {
                                        "__metadata": {
                                            "type": "SP.Taxonomy.TaxonomyFieldValue"
                                        },
                                        "Label": "Flere faser",
                                        "TermGuid": "777cc6ac-4639-4633-85b9-f1ef61197c4d",
                                        "WssId": "-1"
                                    },
                                    AssignedToId: {
                                        "results": [id]
                                    }
                                };
                                var daoUri = _spPageContextInfo
                                    .webAbsoluteUrl
                                    .substring(0, _spPageContextInfo.webAbsoluteUrl.indexOf(_spPageContextInfo.webServerRelativeUrl)) + sitedetails[0].ServerRelativeUrl;
                                var dao = new SPScript.RestDao(daoUri);
                                var list = dao.lists("Oppgaver");
                                list
                                    .addItem(newItem)
                                    .then(function(item) {
                                        console.log(item);
                                        (item.Title === undefined) ?
                                        alert("Noe gikk galt, prøv igjen eller kontakt IT."): tools.removeInstallationRow($("." + tools.currentId));
                                        CloseDialog();
                                    });

                            })
                    } else {
                        var sitedetails = $.map(tools.Sites, function(site) {
                            if (tools.currentId === site.Id) {
                                return site;
                            }
                        });
                        var newItem = {
                            Title: $("#task-title").val(),
                            Body: $("#task-description").val(),
                            StartDate: moment($("#task-start-date").val(), "DD.MM.YYYY"),
                            DueDate: moment($("#task-due-date").val(), "DD.MM.YYYY"),
                            GtProjectPhase: {
                                "__metadata": {
                                    "type": "SP.Taxonomy.TaxonomyFieldValue"
                                },
                                "Label": "Flere faser",
                                "TermGuid": "777cc6ac-4639-4633-85b9-f1ef61197c4d",
                                "WssId": "-1"
                            },
                            AssignedToId: {
                                "results": [id]
                            }
                        };
                        var daoUri = _spPageContextInfo
                            .webAbsoluteUrl
                            .substring(0, _spPageContextInfo.webAbsoluteUrl.indexOf(_spPageContextInfo.webServerRelativeUrl)) + sitedetails[0].ServerRelativeUrl;
                        var dao = new SPScript.RestDao(daoUri);
                        var list = dao.lists("Oppgaver");
                        list
                            .addItem(newItem)
                            .then(function(item) {
                                console.log(item);
                                (item.Title === undefined) ?
                                alert("Noe gikk galt, prøv igjen eller kontakt IT."): tools.removeInstallationRow($("." + tools.currentId));
                                CloseDialog();
                            });

                    }

                });
        }
    }
    removeInstallationRow(title) {
        $(title).remove();
    }
    addInstallationRow(item) {
        return "<div class=\"ms-Table-row " + item.Id + "\"><span class=\"ms-Table-cell ms-font-xl\">" + item.Title + "</span><span class=\"ms-Table-cell ms-font-xl\">" + ((item.AssignedTo === null) ?
            "<button type=\"button\" class=\"ms-Button ms-Button--command\" id=\"" + item.Id + "\"><span class=\"ms-Button-icon\"><i class=\"ms-Icon ms-Icon--plus\"></i></span>" +
            " <span class=\"ms-Button-label\">Tilordnet til</span></button>" :
            item.AssignedTo) + "</span><span class=\"ms-Table-cell ms-font-xl\">" + item.Title + "</span></div>";
    }
    consoleMe() {
        console.log(this);
    }
};

/* ES6 code, with classes */
class Civilian {
    constructor(name) {
        this.name = name;
    }
    danger() {
        console.log("Run away!");
    }
};

class SuperHero extends Civilian {
    constructor(name, ability) {
        super(name); // Call the super class constructor
        this.ability = ability;
    }
    danger() { // Override the super class method
        console.log("Never fear, " + this.name + " is here!");
        console.log(this.name + " uses " + this.ability + ". It's super effective.");
    }
};

var InitDatePicker = function(dp) {
    dp.DatePicker({
        firstDay: 1,
        format: "dd.mm.yyyy",
        formatSubmit: "yyyy.mm.dd",
        weekdaysShort: [
            "Søn",
            "Man",
            "Tir",
            "Ons",
            "Tor",
            "Fre",
            "Lør"
        ],
        monthsFull: [
            "Januar",
            "Februar",
            "Mars",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Desember"
        ]
    });
};

var ShowForm = function() {
    $("#items").show();
    $("#ToolHeader").show();
    $("#SelectedProjectContainer").show();
    $("#ToolStatusLabel").show();
    $("#AddProductContainer").show();
};

var AddInstallations = function(tools) {
    $.ajax({
        url: webAbsoluteUrl + "/_api/web/getsubwebsfilteredforcurrentuser(nwebtemplatefilter=-1,nconfigurationf" +
            "ilter=0)?$Select=Id,Title",
        type: "GET",
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Accept", "application/json; odata=verbose");
        },
        cache: true,
        error: function(data) {
            $
                .each(result, function(data, status, xhr) {
                    console.log(data);
                });
        },
        success: function(data) {
            var m = $.map(data.d.results, function(obj, i) {
                // console.log(obj.Title);
                $("#tool-installation-picker").append(CreateInstallationCheckBox(obj, i));
            });
            $
                .when
                .apply(null, m)
                .done(function() {
                    $('#tool-installation-picker')
                        .on('click', 'input', function() {
                            // console.log(this);
                            if (this.checked) {
                                tools.addLocation(this);
                                $("." + this.id + " span button").click(function() {
                                    tools.currentId = this.id;
                                    var filteredInputs = $("input:blank:not(:hidden)").map(function() {
                                        if (this.name.indexOf('task-') !== -1) {
                                            $(this).css("background-color", "#d83b01");
                                            $(this).css("color", "#fff");
                                            return this.id;
                                        }

                                    }).get();

                                    if (filteredInputs.length > 0) {
                                        alert("Fyll inn de nødvendige feltene markert med rødt.")
                                    } else {
                                        $(".ms-Dialog").show();
                                        $(".people-search").focus();
                                    }

                                });
                            } else {
                                tools.removeLocation(this);
                            }
                        });
                    $("#tool-installation-picker").addClass("ms-Grid-row");
                });
        }
    });

};

var CreateInstallationCheckBox = function(item, i) {
    return "<div class=\"ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg2\"><div class=\"ms-CheckBox\"" +
        "><input tabindex=\"-1\" title=\"" + item.Title + "\" id=\"" + item.Id + "\"  type=\"checkbox\" class=\"ms-CheckBox-input\"><label role=\"checkbox\" class" +
        "=\"ms-CheckBox-field\" tabindex=\"" + i + "\" aria-checked=\"false\" name=\"" + item.Title + "\"><span class=\"ms-Label ms-fontSize-l\">" + item.Title + "</span></label></div></div>";
};

function CloseDialog() {
    $(".people-search").val("");
    RemovePeoplePickerValue($(".selected-user-display"));
    $(".ms-Dialog").hide();
};