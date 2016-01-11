/// <reference path="../../../typings/tsd.d.ts" />

module app.todos {
    'use strict';

    todoListComponentDirective.$inject = [];
    export function todoListComponentDirective(): ng.IDirective {
        return {
            templateUrl: 'app/public/todo/todo-list.html',
            restrict: 'EA',
            replace: false,
            scope: {},
            controller: TodoComponent,
            controllerAs: 'vm',
            bindToController: true,
            link: () => { // scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes
                // ...
            }
        };
    }


    export class TodoComponent implements ITodoComponentScope {
        todos: TodoItem[];
        newTodo: string;
        editedTodo: TodoItem;
        originalTodo: TodoItem;
        remainingCount: number;
        completedCount: number;
        allChecked: boolean;
        reverted: boolean;
        statusFilter: { Completed: any; };

        filterType: string;
        saving: boolean = false;
        // filteredTodos: TodoItem[];
        addingTodoItem: boolean = false;

        public static $inject = ['todoStoreLocal', Injectables.$scope, Injectables.$timeout, 'filterFilter'];

        constructor(
            private store: ITodoStorage,
            private $scope: ng.IScope, // ITodoScope,
            private $timeout: ng.ITimeoutService,
            private filterFilter: Function
            ) {

            this.newTodo = '';
            this.originalTodo = null;
            this.editedTodo = null;
            this.todos = [];

            this.store.get().then((data: any) => {
                this.todos = data;
                this.sortList(this.todos);
                // this.filteredTodos = data.slice(0); // will return a new array, like deepClone
            });

            $scope.$watch(() => this.todos, () => { // newValue: string, oldValue: string
                this.onTodos();
            }, true);

            this.filterListBy('all');
        }

        filterListBy(filter: string) {

            this.filterType = filter;

            if (this.filterType === 'active') {
                this.statusFilter = { Completed: false };
            } else if (this.filterType === 'completed') {
                this.statusFilter = { Completed: true };
            } else if (this.filterType === 'all') {
                this.statusFilter = { Completed: '!!' };
            }
            // this.filterTodos();
        }

        onTodos() {
            this.remainingCount = this.filterFilter(this.todos, { Completed: false }).length;
            this.completedCount = this.todos.length - this.remainingCount;
            this.allChecked = !this.remainingCount;
            // this.filterTodos();
        }

        addTodoItem() {
            this.addingTodoItem = true;
        }

        undoAdd() {
            this.addingTodoItem = false;
        }

        addTodo() {
            var newTodo: string = this.newTodo.trim();

            if (!newTodo.length) {
                return;
            }

            this.saving = true;
            this.store.insert(new TodoItem(newTodo, false))
            .then(() => {
                this.newTodo = '';
            })
            .finally(() => {
                this.saving = false;
                this.addingTodoItem = false;
            });
        }

        saveTodo(todoItem: TodoItem) {
            // this.store.put(todoItem);
        }

        editTodo(todoItem: TodoItem) {
            this.editedTodo = todoItem;
            // Clone the original todoItem to restore it on demand.
            this.originalTodo = new TodoItem(todoItem.Description, todoItem.Completed);
        }

        doneEditing(todoItem: TodoItem) {
            //// Blur events are automatically triggered after the form submit event.
            //// This does some unfortunate logic handling to prevent saving twice.
            //if (event === 'blur' && $scope.saveEvent === 'submit') {
            //    $scope.saveEvent = null;
            //    return;
            //}
            //// $scope.saveEvent = event;

            if (this.reverted) {
                this.reverted = null;
                return;
            }

            todoItem.Description = todoItem.Description.trim();

            if (todoItem.Description === this.originalTodo.Description) {
                this.editedTodo = null;
                return;
            }

            this.store[todoItem.Description ? 'put' : 'delete'](todoItem)
            .then(null, () => {
                todoItem.Description = this.originalTodo.Description;
            })
            .finally(() => {
                this.editedTodo = null;
            });

        }

        removeTodo(todoItem: TodoItem) {
            this.store.delete(todoItem);
        }

        clearCompletedTodos() {
            this.store.clearCompleted();
        }

        revertEdits(todoItem: TodoItem) { //, $index: number
            var index: number = this.todos.indexOf(todoItem);

            // Firefox seems not to update when $digest is running and we change the data. This seems to work.
            this.$timeout(() => {
                // this.$scope.$apply(() => {
                this.todos[index] = this.originalTodo;
                this.editedTodo = null;
                this.originalTodo = null;
                this.reverted = true;
                // });
           }, 0);
        }

        markAll(completed: boolean) {
            this.todos.forEach((todoItem: TodoItem) => { todoItem.Completed = completed; });
        }

        toggleCompleted(todoItem: TodoItem) {
            this.store.put(todoItem)
                .then(this.sortList, () => {
                    todoItem.Completed = !todoItem.Completed;
                });
        }


        private sortList(todos: Array<TodoItem>) {
            todos.sort((a: TodoItem, b: TodoItem) => {
                if (a.Completed === false && b.Completed === true) {
                    return -1;
                }
                if (a.Completed === true && b.Completed === false) {
                    return 1;
                }
                return 0;
            });
        }

        
        /*
        // One does not need to realy on the pipe ( | ) to filter in the ng-repeat. 
        private filterTodos() {
            this.filteredTodos = this.todos.filter((todoItem: TodoItem) => {
                if (this.statusFilter === null) {
                    return true;
                }
                if (todoItem.completed === this.statusFilter.completed) {
                    return false;
                }

                return false;
            });
        }
        */
    }

    angular.module(NgModules.Todo).directive('todoList', todoListComponentDirective);
}
