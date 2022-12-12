import '../../App.css';
import Notification from './Notification';


function NotificationsList(props) {
    const notifications = props.notifications
    var componentId = 0;

    return (
        <>
            {notifications.map((notification) => (
                <Notification key={componentId++} notification={notification}/>
            ))}
        </>
    );
}

export default NotificationsList;