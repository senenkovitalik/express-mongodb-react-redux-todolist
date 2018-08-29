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
import {LOGGED} from "./constants";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: sessionStorage.getItem(LOGGED)
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.setState({ logged: true });
    sessionStorage.setItem(LOGGED, '1');

  }

  logout() {
    this.setState({ logged: false });
    sessionStorage.removeItem(LOGGED);
  }

  render() {
    return (
      <div>
        <Route exact path="/"
               render={props => <Header {...props} logged={this.state.logged} logout={this.logout} /> } />

        <Route exact path="/" component={Home}/>
        <Route path="/login" render={props => <Login {...props} login={this.login} />} />
        <Route path="/signup"
               render={props => <Signup {...props} login={this.login} logged={this.state.logged} />}/>
        <Route path="/list/1" component={Tasks}/>
        <Route path="/task" component={Task}/>

        <Footer/>
      </div>
    )
  }
}

export default App;