/// <reference path="../../../typings/tsd.d.ts" />

module app.todosRedux {
    'use strict';

    export const LOAD_TODOS = 'LOAD_TODOS';
    export const ADD_TODO = 'ADD_TODO';
    export const TOGGLE_TODO = 'TOGGLE_TODO';
    export const DELETE_TODO = 'DELETE_TODO';
    export const COMPLETE_TODO = 'COMPLETE_TODO';
    export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
    export const BACKEND_ACTION_STARTED = 'BACKEND_ACTION_STARTED';
    export const BACKEND_ACTION_FINISHED = 'BACKEND_ACTION_FINISHED';

    export const VisibilityFilters = {
        SHOW_ALL: 'SHOW_ALL',
        SHOW_COMPLETED: 'SHOW_COMPLETED',
        SHOW_ACTIVE: 'SHOW_ACTIVE'
    };


    export function loadTodos(todos:Immutable.List<Todo>, $http) {

        return (dispatch) => {
            return $http.get('http://localhost:8080/api/todo/').then((resp) => {
                dispatch({
                    type: LOAD_TODOS,
                    todos: todos.merge(resp.data)
                });
            });
        };

    }

    export function addTodo(newTodo:Todo) {
        return {
            type: ADD_TODO,
            newTodo
        }
    }

    export function toggleTodo(todo:Todo) {
        return {
            type: TOGGLE_TODO,
            todo
        }
    }

    export function deleteTodo(todo:Todo) {
        return {
            type: DELETE_TODO,
            todo
        }
    }
    export function completeTodo(todo:Todo) {
        return {
            type: COMPLETE_TODO,
            todo
        }
    }

    export function setVisibilityFilter(filter) {
        return {
            type: SET_VISIBILITY_FILTER,
            filter
        }
    }

    export function startBackendAction(message:string) {
        return {
            type: BACKEND_ACTION_STARTED,
            message
        }
    }

    export function endBackendAction(message:string = '') {
        return {
            type: BACKEND_ACTION_FINISHED
        }
    }
}