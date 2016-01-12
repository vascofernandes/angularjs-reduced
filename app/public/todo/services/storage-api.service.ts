module app.todos {
    'use strict';

    export class TodoStorageApi implements ITodoStorage {

        todos: TodoItem[];

        private $http: ng.IHttpService;
        private api: string;

        static $inject = [Injectables.$http];

        constructor($http: ng.IHttpService) {
            this.$http = $http;
            this.todos = [];
            this.api = 'http://localhost:8080/api/todo/'
        }

        clearCompleted () {
            var originalTodos = this.todos.slice(0);

            var completeTodosIds = [];
            var incompleteTodos = [];
            this.todos.forEach((todo: TodoItem) => {
                if (todo.Completed) {
                    completeTodosIds.push(todo.id);
                } else {
                    incompleteTodos.push(todo);
                }
            });

            angular.copy(incompleteTodos, this.todos);

            return this.$http.post(this.api + 'deleteall', {ids: completeTodosIds})
                .then(() => {
                    return this.todos;
                }, () => {
                    angular.copy(originalTodos, this.todos);
                    return originalTodos;
                });
        }

        delete (todo: TodoItem) {
            var originalTodos = this.todos.slice(0);

            this.todos.splice(this.todos.indexOf(todo), 1);

            return this.$http.delete(this.api + '?id=' + todo.id)
                .then(() => {
                    return this.todos;
                }, () => {
                    angular.copy(originalTodos, this.todos);
                    return originalTodos;
                });
        }

        get () {
            return this.$http.get(this.api)
                .then((resp: any) => {
                    angular.copy(resp.data, this.todos);
                    return this.todos;
                });
        }

        insert (todo: TodoItem) {
            var originalTodos = this.todos.slice(0);

            return this.$http.post(this.api, todo)
                .then((resp: any) => {
                    // todo.id = resp.data.id;
                    this.todos.push(resp.data);
                    return this.todos;
                }, () => {
                    angular.copy(originalTodos, this.todos);
                    return this.todos;
                });
        }

        put (todo: TodoItem) {
            var originalTodos = this.todos.slice(0);

            return this.$http.put(this.api, todo)
                .then(() => {
                    return this.todos;
                }, () => {
                    angular.copy(originalTodos, this.todos);
                    return originalTodos;
                });
        }

    }

    angular.module(NgModules.Todo).service('todoStore', TodoStorageApi);
} 