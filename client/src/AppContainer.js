import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { todoApp } from './redux/reducers';
import App from './App';

const loggerMiddleware = createLogger();

const store = createStore(
  todoApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

export const AppContainer = ({ logged }) => {
  return <Provider store={store}>
            <App logged={logged} />
        </Provider>
};


