import React from 'react'
import { Link } from 'react-router'

import NotificationContainer from './notification';

export default class App extends React.Component {
    render() {
        return <div>
            
            {this.props.children}
            <NotificationContainer />
            <br />

                
            <Link to="/">Books</Link>
            <Link to="/authors/">Authors</Link>

        </div>
    }

}