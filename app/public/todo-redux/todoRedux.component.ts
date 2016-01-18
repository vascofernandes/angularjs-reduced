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
        private newTodo = '';
        private saving = false;
        addingTodoItem: boolean = false;

        public static $inject = ['todoReduxStore', Injectables.$http];

        constructor(private store: TodoStore, private $http: ng.IHttpService) {
            let self = this;
            store.dispatch(loadTodos(Immutable.List<Todo>(), $http)).then(() => {
                store.getState().todoList.todos.toJS().forEach((todo) => {
                    self.todos.push(todo);
                });
            });
        }

        onTodos() {

        }

        addTodoItem() {
            this.addingTodoItem = true;
        }

        undoAdd() {
            this.addingTodoItem = false;
        }

        addTodo() {
            let newTodo: string = this.newTodo.trim();

            if (!newTodo.length) {
                return;
            }
            this.saving = true;
            let todo = new Todo({Description: newTodo, Completed: false});
            let action = addTodo(todo, this.$http);
            this.store.dispatch(action).then(() => {
                console.log(this.todos);
                this.todos.length = 0;

                this.store.getState().todoList.todos.toJS().forEach((todo) => {
                    console.log(this.todos);
                    this.todos.push(todo);
                });
            }).finally(() => {
                this.newTodo = '';
                this.saving = false;
                this.addingTodoItem = false;
            });
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
