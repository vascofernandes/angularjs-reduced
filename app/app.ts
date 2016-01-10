/// <reference path="../typings/tsd.d.ts" />

module app {
    'use strict';

    export var NgModules = <INgModules> {
        Main: 'app.Main',
        Todo: 'app.Todo'
    };

    angular.module(NgModules.Todo, []);

    export var LoadNgModules = [
        NgModules.Todo
    ];

    angular.module(NgModules.Main, LoadNgModules);

    angular.element(document).ready(function () {
        angular.bootstrap(document, [NgModules.Main]);
    });

}
