module app.todosRedux {
    'use strict';

    const TodoRecord = Immutable.Record({
        id: 0,
        description: "",
        completed: false
    });

    export class Todo extends TodoRecord {

        id:number;
        description:string;
        completed:boolean;

        constructor(props) {
            super(props);
        }

    }

}