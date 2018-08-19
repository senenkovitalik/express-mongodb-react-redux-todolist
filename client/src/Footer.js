import React from 'react';
import {
    Navbar
} from 'reactstrap';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar color="dark" dark style={{justifyContent: 'center'}}>
                <span style={{color: '#ffffff'}}>Vital.com&trade; 2018</span>
            </Navbar>
        );
    }
}

export default Footer;