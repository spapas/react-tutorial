import React from 'react'
import { Link } from 'react-router'

import NotificationContainer from './notification';

export default class App extends React.Component {
    render() {
        return <div>
            
            {this.props.children}
            <NotificationContainer />
            <br />
            {
                this.props.location.pathname === "/" ?
                "":
                <Link to="/">Books</Link>
            }
        </div>
    }

}