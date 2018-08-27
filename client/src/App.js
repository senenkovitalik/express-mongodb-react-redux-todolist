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

    this.state = {
      logged: false
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.setState({ logged: true });
    console.log("User is logged in.");
  }

  logout() {
    this.setState({ logged: false });
    console.log("User is logged out.");
  }

  render() {
    return (
      <div>
        <Header logged={this.state.logged} logout={this.logout} />

        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
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