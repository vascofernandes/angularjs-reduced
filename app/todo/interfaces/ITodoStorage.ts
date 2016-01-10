module app.todos {
    'use strict';

    export interface ITodoStorage {
        todos: TodoItem[];

        get(): ng.IPromise<any>;
        insert(todo: TodoItem): ng.IPromise<any>;
        put(todo: TodoItem): ng.IPromise<any>;
        delete(todo: TodoItem): ng.IPromise<any>;
        clearCompleted(): ng.IPromise<any>;
    }

}