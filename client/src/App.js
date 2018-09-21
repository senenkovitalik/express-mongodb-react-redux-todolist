import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import {withRouter} from 'react-router';
import Header from "./Header";
import Footer from "./Footer";
import Home from './content/home/Home';
import Login from './content/login/Login';
import Signup from './content/signup/Signup';
import { ListsContainer } from './content/lists/ListsContainer';
import ListTasks from "./content/tasks/ListTasks";
import Task from "./content/task/Task";
import 'bootstrap/dist/css/bootstrap.min.css';
import {LOGGED} from "./constants";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: true
        // sessionStorage.getItem(LOGGED)
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
        <Header history={this.props.history} logged={this.state.logged} logout={this.logout} />

        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" render={props => <Login {...props} login={this.login} />} />
          <Route
            path="/signup"
            render={props =>
              <Signup
                {...props}
                login={this.login}
                logged={this.state.logged} />}
          />
          <Route path="/lists/:id" component={ListTasks}/>
          <Route path="/lists" render={props => <ListsContainer history={props.history} />} />
          <Route path="/task" component={Task}/>
          <Route path="*" render={() => <h1>404 Not Found</h1>} />
        </Switch>

        <Footer/>
      </div>
    )
  }
}

export default withRouter(App);