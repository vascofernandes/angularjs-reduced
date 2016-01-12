module app.todosRedux {
    'use strict';

    const logger = (<any>createLogger)({
        stateTransformer: (state) => {
            return {
                todos: state.todos.toJS(),
                uiState: state.uiState
            }
        }
    });

    const createStoreWithMiddleware = Redux.applyMiddleware(logger)(Redux.createStore);
    const store = createStoreWithMiddleware(
        todoApp,
        {
            todos: Immutable.List([]),
            uiState: initialUiState
        });



    /**
     *
     * A minimalistic Redux store for Angular 2. This class is meant to demonstrate how Redux can be integrated with Angular 2.
     *
     * This class is meant to be sub-classed per project, and a redux store needs to be passed in the constructor.
     *
     * This class then needs to be passed to the root bootstrap call of the application, so that the store can be
     * injected in any part of the application that needs it.
     *
     * The redux API methods getState(), dispatch() and subscribe() are exposed directly.
     *
     */

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
            this.store.dispatch(action);
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