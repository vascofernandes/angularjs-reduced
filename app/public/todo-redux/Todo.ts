module app.todosRedux {
    'use strict';

    const TodoRecord = Immutable.Record({
        id: 0,
        Description: "",
        Completed: false
    });

    export class Todo extends TodoRecord {

        id:number;
        Description:string;
        Completed:boolean;

        constructor(props) {
            super(props);
        }

    }

}