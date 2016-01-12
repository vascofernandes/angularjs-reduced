module app.todos {
    'use strict';
    // ReSharper disable InconsistentNaming

    export class TodoItem {
        public id: number;

        constructor(public Description: string, public Completed: boolean) {
        }
    }
}