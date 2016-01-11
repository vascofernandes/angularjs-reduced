module app.todos {
    'use strict';

    /**
     * Services that persists and retrieves TODOs from localStorage.
     */
    export class TodoStorage {

        storageId = 'todos-angularjs-typescript';

        /*
        get(): TodoItem[] {
            let json = localStorage.getItem(this.STORAGE_ID) || '[]';
            return JSON.parse(json);
        }

        put(todos: TodoItem[]) {
            localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
        }
        */
        /*
        // Detect if an API backend is present. If so, return the API module, else
        // hand off the localStorage adapter
        return $http.get('/api')
            .then(function () {
                return $injector.get('api');
            }, function () {
                return $injector.get('localStorage');
            });
        */
    }
}