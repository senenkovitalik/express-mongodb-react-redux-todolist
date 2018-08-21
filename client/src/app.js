import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Home from './content/home/Home';
import Login from './content/login/Login';
import Signup from './content/signup/Signup';
import Tasks from "./content/tasks/Tasks";
import Task from "./content/task/Task";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <Router>
            <div>
              <Header />

              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup} />
              <Route path="/lists" component={Tasks} />
              <Route path="/task" component={Task} />

              <Footer />
            </div>
          </Router>
        )
    }
}

export default App;