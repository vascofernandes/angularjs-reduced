module app.todosRedux {

    function todos(state:Immutable.List<Todo>, action) {
        if (!state) {
            return Immutable.List([]);
        }
        switch (action.type) {
            case LOAD_TODOS:
                return Immutable.List(action.todos);
            case ADD_TODO:
                return state.push(action.newTodo);
            case TOGGLE_TODO:
                return toggleTodo(state, action);
            case DELETE_TODO:
                let index = state.findIndex((todo) => todo.id === action.todo.id);
                return state.delete(index);
            default:
                return state;
        }
    }

    function toggleTodo(state, action) {
        let index = state.findIndex((todo:Todo) => todo.id === action.todo.id);
        let toggled:Todo = state.get(index);
        return state.set(index, new Todo({
            id: toggled.id,
            description: toggled.description,
            completed: !toggled.completed
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
        todos
    });
}