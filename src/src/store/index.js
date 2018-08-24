import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import userReducer from './reducers/user';
import usersReducer from './reducers/users';
import pipelineReducer from './reducers/pipeline';
import blockReducer from './reducers/block';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const middlewares = [
    sagaMiddleware
];

const rootReducer = combineReducers({
    user: userReducer,
    users: usersReducer,
    pipeline: pipelineReducer,
    block: blockReducer,
});

const createMiddleware = (history) => composeEnhancer(
    applyMiddleware(
        ...middlewares,
        routerMiddleware(history),
    ),
);

export default (history) => {
    const result = createStore(
        connectRouter(history)(rootReducer),
        createMiddleware(history)
    );

    sagaMiddleware.run(rootSaga);
    return result;
};
