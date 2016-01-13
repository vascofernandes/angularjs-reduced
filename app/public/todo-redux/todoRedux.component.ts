/// <reference path="../../../typings/tsd.d.ts" />

module app.todosRedux {
    'use strict';

    todoReduxListComponentDirective.$inject = [];
    export function todoReduxListComponentDirective(): ng.IDirective {
        return {
            templateUrl: 'app/public/todo-redux/todo-list.html',
            restrict: 'EA',
            replace: false,
            scope: {},
            controller: TodoReduxComponent,
            controllerAs: 'vm',
            bindToController: true,
            link: () => {}
        };
    }

    export class TodoReduxComponent  {

        private statusFilter = { Completed: '!!' };
        private todos: Todo[] = [];

        public static $inject = ['todoReduxStore', Injectables.$http];

        constructor(private store: TodoStore, $http) {
            let self = this;
            store.dispatch(loadTodos(Immutable.List<Todo>(), $http)).then(() => {
                let serverTodos: Todo[] = store.getState().todoList.todos.toJS();
                serverTodos.forEach((todo) => {
                    self.todos.push(todo);
                });
            });
        }

        onTodos() {

        }

        addTodoItem() {
        }

        undoAdd() {
        }

        addTodo() {
        }

        saveTodo(todoItem: Todo) {
        }

        editTodo(todoItem: Todo) {
        }

        doneEditing(todoItem: Todo) {
        }

        removeTodo(todoItem: Todo) {
        }

        clearCompletedTodos() {
        }

        revertEdits(todoItem: Todo) {
        }

        markAll(completed: boolean) {
        }

        toggleCompleted(todoItem: Todo) {

        }

    }

    angular.module(NgModules.Todo).directive('todoReduxList', todoReduxListComponentDirective);
}
