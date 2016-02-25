import React from 'react';
import { Notification } from 'react-notification';
import { connect } from 'react-redux'
import { hideNotification } from '../actions'

import * as colors from '../util/colors'

const NotificationContainer = (props) => {
    let { message, notification_type } = props.notification;
    let { onHide } = props;
    let isActive = message?true:false;
    let color;

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
        onDismiss={ ()=>onHide() }
        action='X'
        onClick={ ()=>onHide() }
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


let mapStateToProps = state => ({
	notification: state.notification
})

let mapDispatchToProps = dispatch => ({
	onHide: () => {
		dispatch(hideNotification())
    }
})	

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);
