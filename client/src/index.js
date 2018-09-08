import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { todoApp } from './redux/reducers';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import { createList, deleteList } from './redux/actions';
import {createFormData} from "./utils";

const store = createStore(
  todoApp,
  applyMiddleware(thunkMiddleware)
);

store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>  ,
  document.getElementById('app')
);

const opts = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  body: createFormData({ email: 'senenkovitalik@gmail.com', password: 'Qwerty1!' })
};

// fetch('/api/login', opts).then(res => {
//   if (res.ok && res.status === 200) {
//     store.dispatch(createList('My First List'));
//   }
// }).catch(err => console.error(err));
