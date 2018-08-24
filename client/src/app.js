import React from 'react';
import {
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
          <div>
            <Header />

            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup} />
            <Route path="/list/1" component={Tasks} />
            <Route path="/task" component={Task} />

            <Footer />
          </div>
        )
    }
}

export default App;