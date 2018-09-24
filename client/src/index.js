import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {AppContainer} from "./AppContainer";

ReactDOM.render(
  <Router>
    <AppContainer />
  </Router>,
  document.getElementById('app')
);
