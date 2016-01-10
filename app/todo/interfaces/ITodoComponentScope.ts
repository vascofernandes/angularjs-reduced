module app.todos {
    'use strict';

    export interface ITodoComponentScope {
        todos: TodoItem[];
        newTodo: string;
        editedTodo: TodoItem;
        originalTodo: TodoItem;
        remainingCount: number;
        completedCount: number;
        allChecked: boolean;
        reverted: boolean;
        statusFilter: { Completed: boolean; };
        // location: ng.ILocationService;
        filterType: string;
        saving: boolean;
        // filteredTodos: TodoItem[];
        addingTodoItem: boolean;

        filterListBy(filter: string): void;
        onTodos(): void;
        addTodo(): void;
        editTodo(todoItem: TodoItem): void;
        doneEditing(todoItem: TodoItem): void;
        removeTodo(todoItem: TodoItem): void;
        clearCompletedTodos(): void;
        markAll(completed: boolean): void;
    }

}