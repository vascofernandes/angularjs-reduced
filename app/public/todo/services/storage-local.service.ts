module app.todos {
    'use strict';

    export interface ITodoStorageLocal extends ITodoStorage {
        storageId: string;

        getFromLocalStorage();
        saveToLocalStorage(todos: TodoItem[]);
    }

     export class TodoStorageLocal implements ITodoStorageLocal {

         private $q: ng.IQService;

         public storageId: string = 'backoffice-web-todo-list';
         public todos: TodoItem[];

         public static $inject = [Injectables.$q];

         constructor($q: ng.IQService) {
             this.$q = $q;
         }

         getFromLocalStorage() {
             return JSON.parse(localStorage.getItem(this.storageId) || '[]');
         }

         saveToLocalStorage(todos: TodoItem[]) {
             localStorage.setItem(this.storageId, JSON.stringify(todos));
         }

         get(): ng.IPromise<any> {
             var deferred = this.$q.defer();

             // Empty destination and copy contents from source to destination.
             // angular.copy(this._getFromLocalStorage(), this.todos);

             // A full new array of objects
             // this.todos = JSON.parse(JSON.stringify(this._getFromLocalStorage()));
             // this.todos = _.map(this._getFromLocalStorage(), _.clone); // Only 2 level deep
             // this.todos = deepClone(this._getFromLocalStorage());
             this.todos = this.getFromLocalStorage().slice(0);


             deferred.resolve(this.todos);

             return deferred.promise;
         }

         insert(todo: TodoItem): ng.IPromise<any> {
             var deferred = this.$q.defer();

             this.todos.push(todo);

             this.saveToLocalStorage(this.todos);
             deferred.resolve(this.todos);

             return deferred.promise;
         }

         put(todo: TodoItem): ng.IPromise<any> {
             var deferred = this.$q.defer();

             this.todos[this.todos.indexOf(todo)] = todo;

             this.saveToLocalStorage(this.todos);
             deferred.resolve(this.todos);

             return deferred.promise;
         }

         delete(todo: TodoItem): ng.IPromise<any> {
             var deferred = this.$q.defer();

             this.todos.splice(this.todos.indexOf(todo), 1);

             this.saveToLocalStorage(this.todos);
             deferred.resolve(this.todos);

             return deferred.promise;
         }

         clearCompleted(): ng.IPromise<any> {
             var deferred = this.$q.defer();

             var completeTodos = [];
             var incompleteTodos = [];

             this.todos.forEach((todo: TodoItem) => {
                 if (todo.Completed) {
                     completeTodos.push(todo);
                 } else {
                     incompleteTodos.push(todo);
                 }
             });

             angular.copy(incompleteTodos, this.todos);

             this.saveToLocalStorage(this.todos);
             deferred.resolve(this.todos);

             return deferred.promise;
         }
     }

     angular.module(NgModules.Todo).service('todoStoreLocal', TodoStorageLocal);
}