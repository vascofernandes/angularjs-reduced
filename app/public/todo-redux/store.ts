module app.todosRedux {
    'use strict';

    const loggerMiddleware = (<any>createLogger)({
        stateTransformer: (state) => {
            return {
                todos: state.todoList.todos.toJS(),
                uiState: state.uiState
            }
        }
    });

    function thunkMiddleware({ dispatch, getState }) {
        return next => action =>
            typeof action === 'function' ?
                action(dispatch, getState) :
                next(action);
    }

    const createStoreWithMiddleware = Redux.applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )(Redux.createStore);

    const store = createStoreWithMiddleware(
        todoApp,
        {
            todos: Immutable.List([]),
            uiState: initialUiState
        });

    abstract class ReduxStore {

        static initialized = false;

        constructor(private store) {
            if (!store) {
                throw new Error('store cannot be undefined. Make sure to pass the redux store as the only argument of the constructor.');
            }
            if (ReduxStore.initialized) {
                throw new Error('Only one redux store can exist per application.');
            }
            ReduxStore.initialized = true;
        }

        getState() {
            return this.store.getState();
        }

        dispatch(action) {
            return this.store.dispatch(action);
        }

        subscribe(listener: Function) {
            this.store.subscribe(() => listener(this.getState()));
        }

    }



    export class TodoStore extends ReduxStore {

        constructor() {
            super(store);
        }

    }

    angular.module(NgModules.Todo).service('todoReduxStore', TodoStore);
}