import React from 'react';
import Notification from 'react-notification';
import { connect } from 'react-redux'
import { hideNotification } from '../actions'

import * as colors from '../util/colors'

const NotificationContainer = (props) => {
    let { message, notification_type } = props.notification;
    let isActive = message?true:false;
    let color = 'blue';
    
    switch(notification_type) {
        case 'SUCCESS':
            color = colors.success
            break; 
        case 'ERROR':
            color = colors.danger
            break; 
        case 'INFO':
            color = colors.info
            break; 
    }
    
    return <Notification
        isActive={isActive}
        message={message?message:''}
        dismissAfter={5000}
        onDismiss={ ()=>props.dispatch(hideNotification()) }
        action='X'
        onClick={ ()=>props.dispatch(hideNotification()) }
        style={{
            bar: {
                background: color,
                color: 'black',
                fontSize: '2rem',
            },
            active: {
                left: '3rem',
            },
            action: {
                color: '#FFCCBC',
                fontSize: '3rem',
                border: '1 pt solid black'
            }
        }}
    />
}                
         

var mapStateToProps = function(state) {
    return {
        notification:state.notification
    } 
};

export default connect(mapStateToProps)(NotificationContainer);
