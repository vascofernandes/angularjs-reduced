module app.todos {
    'use strict';

	/**
	 * Directive that executes an expression when the element it is applied to gets
	 * an `escape` keydown event.
	 */
    export function todoEscape(): ng.IDirective {

        var ESCAPE_KEY = 27;

        return {
            link: (scope: ng.IScope, element: JQuery, attributes: any) => {
                element.bind('keydown', (event: any) => {
                    if (event.keyCode === ESCAPE_KEY) {
                        scope.$apply(attributes.todoEscape);
                    }
                });

                scope.$on('$destroy', () => {
                    element.unbind('keydown');
                });
            }
        };
    }

    angular.module(NgModules.Todo).directive('todoEscape', todoEscape);
} 