module app.todosRedux {

    interface State {
        visibilityFilter: string,
        todos: Immutable.List<Todo>
    }

    function todoList(state:State, action) {
        if (!state) {
            return {
                visibilityFilter: VisibilityFilters.SHOW_ALL,
                todos: Immutable.List([])
            }
        }
        switch (action.type) {
            case LOAD_TODOS:
                return $.extend({}, state, {todos: state.todos.merge(action.todos)});

            case ADD_TODO:
                return $.extend({}, state, {todos: state.todos.push(action.newTodo)});

            case TOGGLE_TODO:
                return $.extend({}, state, {todos: toggleTodo(state.todos, action)});

            case DELETE_TODO:
                let index = state.todos.findIndex((todo) => todo.id === action.todo.id);
                state.todos.delete(index);
                return $.extend({}, state, {todos: state.todos.delete(index)});

            case SET_VISIBILITY_FILTER:
                return $.extend({}, state, {visibilityFilter: action.filter});

            default:
                return state;
        }
    }

    function toggleTodo(state, action) {
        let index = state.findIndex((todo:Todo) => todo.id === action.todo.id);
        let toggled:Todo = state.get(index);
        return state.set(index, new Todo({
            id: toggled.id,
            description: toggled.Description,
            completed: !toggled.Completed
        }));
    }

    export const initialUiState = {
        actionOngoing: false,
        message: 'Ready'
    };

    function uiState(state:Immutable.List<Todo>, action) {
        if (!state) {
            return initialUiState;
        }
        switch (action.type) {
            case BACKEND_ACTION_STARTED:
                return {
                    actionOngoing: true,
                    message: action.message
                };
            case BACKEND_ACTION_FINISHED:
            default:
                return {
                    actionOngoing: false,
                    message: action.message ? action.message : initialUiState.message
                };
        }
    }

    export const todoApp = Redux.combineReducers({
        uiState,
        todoList
    });
}