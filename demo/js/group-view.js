/* eslint-env browser */

/* globals treedata  */

'use strict';

var grid;

window.onload = function() {
    var Hypergrid = fin.Hypergrid,
        Hyperfilter = Hypergrid.Hyperfilter,
        drillDown = Hypergrid.drillDown,
        GroupView = Hypergrid.GroupView,
        options = {
            includeSorter: true,
            includeFilter: true,
            groups: [5, 0, 1] // alternatively this could be supplied in the setGroups call
        };

    grid = new Hypergrid('div#example');
    grid.setData(window.people1);

    // Install the drill-down API (optional, to play with in console).
    var dataModel = grid.behavior.dataModel,
        dataModelPrototype = Object.getPrototypeOf(dataModel);
    drillDown.mixInTo(dataModelPrototype);

    var filterFactory = new Hyperfilter(grid);
    grid.setGlobalFilter(filterFactory.create());

    // show filter row as per `options`
    grid.setState({
        // columnAutosizing: false,
        showFilterRow: options.includeFilter && grid.behavior.getGlobalFilter().columnFilters
    });

    var groupViewAPI = new GroupView(grid, options);

    document.querySelector('input[type=checkbox]').onclick = function() {
        if (this.checked) {
            // turn group view ON using options.groups
            // Alternatively, you can supply a group list override as a parameter here.
            groupViewAPI.setGroups();
        } else {
            // turn group view OFF
            groupViewAPI.setGroups([]);
        }
    };
};

