import { Navigate } from 'react-router-dom';

const RoleBaseDisplay = (props) => {
    const userData = localStorage.getItem('user');
    const userRole = userData ? JSON.parse(userData).role : null;

    if (!userRole || !props.role.includes(userRole)) {
        return null;
    }

    return props.children;
};

export default RoleBaseDisplay;