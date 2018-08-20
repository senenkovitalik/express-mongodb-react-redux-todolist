import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Home from './content/home/Home';
import Tasks from "./content/tasks/Tasks";
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
              <Route path="/lists" component={Tasks} />

              <Footer />
            </div>
          </Router>
        )
    }
}

export default App;