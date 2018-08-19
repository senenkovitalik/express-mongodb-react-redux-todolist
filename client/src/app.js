import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header";
import Footer from "./Footer";
import Tasks from "./content/tasks/Tasks";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <Tasks />
                <Footer />
            </div>
        )
    }
}

export default App;