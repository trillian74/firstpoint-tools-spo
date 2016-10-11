"use strict";
var dataTableExample = 'undefined';
var webAbsoluteUrl = _spPageContextInfo.webAbsoluteUrl;
var promiseCount = 0;
 $('#example').hide();
var editor;

// Function to get parameter from url
function getURLParam(name, url) {
    // get query string part of url into its own variable
    url = decodeURIComponent(url);
    var query_string = url.split("?");

    // make array of all name/value pairs in query string
    var params = query_string[1].split("&");

    // loop through the parameters
    var i = 0;
    while (i < params.length) {
        // compare param name against arg passed in
        var param_item = params[i].split("=");
        if (param_item[0] == name) {
            // if they match, return the value
            return param_item[1];
        }
        i++;
    }
    return "";
}

function formatRepo(repo) {
    if (repo.loading) 
        return repo.text;
    
    var markup = "<div class='select2-result-repository clearfix'><div class='select2-result-repos" +
            "itory__avatar'><img src='" + repo.owner.avatar_url + "' /></div><div class='select2-result-repository__meta'><div class='select2-resul" +
            "t-repository__title'>" + repo.full_name + "</div>";

    if (repo.description) {
        markup += "<div class='select2-result-repository__description'>" + repo.description + "</div>";
    }

    markup += "<div class='select2-result-repository__statistics'><div class='select2-result-re" +
            "pository__forks'><i class='fa fa-flash'></i> " + repo.forks_count + " Forks</div><div class='select2-result-repository__stargazers'><i class='fa fa-s" +
            "tar'></i> " + repo.stargazers_count + " Stars</div><div class='select2-result-repository__watchers'><i class='fa fa-eye" +
            "'></i> " + repo.watchers_count + " Watchers</div></div></div></div>";

    return markup;
}

function formatRepoSelection(repo) {
    return repo.full_name || repo.text;
}

$(document)
    .ready(function () {
        console.log("document ready");

        var dao = new SPScript.RestDao();
        var list = dao.lists("TestOppgaver");
        var users;
        // list.getItemById(12).then(function(item) { console.log(item) });
        dao
            .search
            .people('bergtun')
            .then(function (result) {
                var users = result
                    .items
                    .map(function (obj) {
                        return obj.UserProfile_GUID;
                    })
                console.log(users);
            });

        //'AssignedToId': {"results": [12] }  //multiple

        // dao
        //     .web
        //     .getUser(_spPageContextInfo.userLoginName)
        //     .then(function (user) {
        //         console.log(user)
        //         var newItem = {
        //             Title: "Test Created Item",
        //             AssignedToId: {
        //                 "results": [user.Id]
        //             }
        //         };
        //         list
        //             .addItem(newItem)
        //             .then(function (item) {
        //                 console.log(item)
        //             });

        //     });

        var $locations = $(".js-data-example-ajax").select2({
            placeholder: {
                id: '-1', // the value of the option
                text: 'VELG INSTALLASJONER'
            },
            tags: true,
            theme: "classic",
            allowClear: true,
            id: function (data) {
                return data.Id;
            },
            text: function (data) {
                return data.Title;
            },
            ajax: {
                url: webAbsoluteUrl + "/_api/web/getsubwebsfilteredforcurrentuser(nwebtemplatefilter=-1,nconfigurationf" +
                        "ilter=0)?$Select=Id,Title",
                dataType: 'json',
                contentType: "application/json;odata=verbose",
                headers: {
                    "accept": "application/json;odata=verbose"
                },
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term // search term

                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2 since we are using
                    // custom formatting functions we do not need to alter the remote JSON data,
                    // except to indicate that infinite scrolling can be used params.page =
                    // params.page || 1;
                    var datar = $.map(data.d.results, function (obj) {
                        obj.id = obj.id || obj.Id; // replace pk with your identifier
                        obj.text = obj.text || obj.Title; // replace name with the property used for the text
                        return obj;
                    })

                    return {
                        results: datar
                        // , pagination: {     more: (params.page * 30) < data.total_count }
                    };
                },
                cache: true
            },
            // escapeMarkup: function (markup) { return markup; }, minimumInputLength: 1,
            // templateResult: formatRepo, templateSelection: formatRepoSelection,
            formatResult: function (item) {
                return item.Title;
            },
            formatSelection: function (item) {
                return item.Title;
            },
            width: '30%'
        });

        //         <button class="mdl-button mdl-js-button mdl-button--raised
        // mdl-js-ripple-effect mdl-button--accent">   Button </button>

        var jqxhr = $
            .getJSON({url: "./config/actions.txt"})
            .done(function (data) {
                var arr = $.map(data.Actions, function (el, index) {
                    $(".action-buttons").append("<button id=\"" + el.Id + "\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\"  v" +
                            "alue=\"" + el.Title + "\">" + el.Title + "</button>");
                    $("#" + el.Id).click(function (e) {
                        e.preventDefault();
                        tools.reactOnButton(this.value);
                    });
                });
            })
            .fail(function (err) {
                console.log("retreive actions failed");
            })
            .always(function (data) {
                console.log("actions always");
            });

        $locations.on("select2:open", function (e) {
            // log("select2:open", e);
        });
        $locations.on("select2:close", function (e) {
            // log("select2:close", e);
        });
        $locations.on("select2:select", function (e) {
            tools.addLocation(e);

            // log("select2:select", e);
        });
        $locations.on("select2:unselect", function (e) {
            tools.removeLocation(e);
            // log("select2:unselect", e);
        });
        $locations.on("change", function (e) {
            log("change");
        });

        function log(name, evt) {
            if (!evt) {
                var args = "{}";
            } else {
                var args = JSON.stringify(evt.params, function (key, value) {
                    if (value && value.nodeName) 
                        return "[DOM node]";
                    if (value instanceof $.Event) 
                        return "[$.Event]";
                    return value;
                });
            }
            console.log(name + " -> " + args);
        }

    });

function BBTOOLSMAN() {
    this.Title = 'bb-tools-man';
    this.locations = [];
    this.SelectedSites = [];
    console.log('bb-tools-man instantiated');
};

BBTOOLSMAN.prototype = {
    constructor: BBTOOLSMAN,
    logArrayElements: function (element) {
        console.log('locations[' + element.Title + '] = ' + element);
    },
    setSelectedSiteInfo: function (params) {
        if (this.locations.length < 1) {
            alert("Ingen valgte installasjoner...");
            return;
        }
        return new Promise(function (resolve, reject) {
            var dao = new SPScript.RestDao();
            var that = params;
            dao
                .web
                .subsites()
                .then(function (sites) {
                    that.SelectedSites = [];
                    that
                        .locations
                        .forEach(function (element) {
                            var index = sites.findIndex(function (o) {
                                return o.Id === element.Id;
                            });
                            that
                                .SelectedSites
                                .push(sites[index]);
                        }, that);
                    resolve(that);
                    // resolve function that     .SelectedSites     .forEach(function (site) {  dao
                    // = new SPScript.RestDao(_spPageContextInfo.webAbsoluteUrl.substring(0,
                    // _spPageContextInfo.webAbsoluteUrl.indexOf(_spPageContextInfo.webServerRelativ
                    // e Url)) + site.ServerRelativeUrl);         var opgList =
                    // dao.lists("Oppgaver");         opgList             .getItems() .then(function
                    // (items) {                console.log(items.length);  });     }, that);
                });
        });

    },
    setSelectedSites: function (arr) {
        this.SelectedSites = arr;
    },
    setLocations: function (selectedLocations) {
        this.locations = selectedLocations;
    },
    findLocationById: function (id) {},
    addLocation: function (item) {
        var index = this
            .locations
            .findIndex(function (o) {
                // if(o.Id === item.params.data.Id)
                return o.Id === item.params.data.Id;
            }) || -1;
        (index === -1)
            ? this
                .locations
                .push({Id: item.params.data.Id, Title: item.params.data.Title})
            : this
                .locations
                .splice(index, 1);
        this
            .locations
            .map(function (obj) {
                console.log('locations[' + obj.Id + '] = ' + obj.Title);
            });
    },
    removeLocation: function (item) {
        var index = this
            .locations
            .findIndex(function (o, i) {
                console.log(i);
                return o.Id === item.params.data.Id;
            });
        this.deleted = this
            .locations
            .splice(index, 1);
        this
            .locations
            .map(function (obj) {
                console.log('locations[' + obj.Id + '] = ' + obj.Title);
            });
    },
    createTasks: function () {

        console.log("tools-man create tasks");
    },
    reactOnButton: function (button) {
        switch (button) {
            case "Distribute tasks":
                this
                    .setSelectedSiteInfo(this)
                    .then(function (result) {

                        var myArray = $.map(result.SelectedSites, function (value, index) {
                            return {
                                // Id: value.Id,
                                Title: "",
                                Description: "",
                                AssignedTo: null,
                                ProjectSiteTitle: value.Title,
                                ServerRelativeUrl: value.ServerRelativeUrl
                            };
                        });
                        if (dataTableExample != 'undefined') {
                            dataTableExample.destroy();
                        }
                        if(! $('#example').is(':visible')){
                            $('#example').show();
                           
                        }
                        dataTableExample = $('#example').DataTable({
                            aaData: myArray,
                            aoColumns: [
                                // {
                                //     mData: 'Id'
                                // },
                                 {
                                    mData: 'Title'
                                }, {
                                    mData: 'Description'
                                }, {
                                    mData: 'AssignedTo'
                                }, {
                                    mData: 'ProjectSiteTitle'
                                }, {
                                    mData: 'ServerRelativeUrl'
                                }

                            ]
                        });

                    });
                $('#example').on('click', 'tbody td', function () {
                    var data = dataTableExample
                        .cell(this)
                        .render('display');
                    var column_num = parseInt($(this).index()) + 1;
                    var row_num = parseInt($(this).parent().index()) + 1;
                    console.log("Row_num =" + row_num + "  ,  Column_num =" + column_num);
                    if (column_num === 3) {

                        if ($(this).children().length === 0) {
                            $(this).text("");
                            var input = $("<input />");
                            $(this).append(input);
                            input.attr("name", "users")
                            $(input).pickSPUser({
                                allowMultiples: false,
                                onPickUser: function (u) {

                                    console.log("onPickUser Person added: " + u.displayName + ")");
                                }
                            });
                        }
                    }
                });
                break;

            default:
                console.log("action not implemented");
                alert("action not implemented");
                break;
        }

    }
};

var tools = new BBTOOLSMAN();

// Show the firstName properties of the objects
console.log('tools is ' + tools.Title); // log