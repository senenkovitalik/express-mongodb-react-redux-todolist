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
import { ListTasksContainer } from "./content/tasks/ListTasksContainer";
import { TaskContainer } from "./content/task/TaskContainer";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: this.props.logged
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.setState({ logged: true });
  }

  logout() {
    this.setState({ logged: false });
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
          <Route exact path="/lists/:id" render={props => <ListTasksContainer {...props} />}/>
          <Route exact path="/lists" render={props => <ListsContainer history={props.history} />} />

          <Route
            exact
            path="/lists/:id/tasks"
            render={props => <TaskContainer {...props} />}
          />
          <Route
            exact
            path="/lists/:id/tasks/:task_id"
            render={props => <TaskContainer {...props} />}
          />

          <Route path="*" render={() => <h1>404 Not Found</h1>} />
        </Switch>

        <Footer/>
      </div>
    )
  }
}

export default withRouter(App);