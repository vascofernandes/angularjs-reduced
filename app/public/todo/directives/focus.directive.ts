﻿module app.todos {
    'use strict';

	/**
	 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true.
	 */
    export function todoFocus($timeout: ng.ITimeoutService): ng.IDirective {
        return {
            link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
                $scope.$watch(attributes.todoFocus, (newval: any) => {
                    if (newval) {
                        $timeout(() => element[0].focus(), 0, false);
                    }
                });
            }
        };
    }
    todoFocus.$inject = ['$timeout'];

    angular.module(NgModules.Todo).directive('todoFocus', todoFocus);
}