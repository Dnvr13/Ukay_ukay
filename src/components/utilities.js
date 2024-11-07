import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('admin')
    window.location.reload();
}

export const useCheckUserLoggedUtil = () => {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        setLogged(!!token); // Convert token to boolean
    }, []);
    return { logged };
};

export const useIsAdminUtil = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const admin = Cookies.get('admin')
        setIsAdmin(admin)
    }, [])
    return { isAdmin };
}

export const dateFormatter = (dateString) => {
    const date = new Date(dateString);

    // Format the date as desired
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
}


export const dateFormatterAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days === 1) {
        return 'Yesterday';
    } else if (days < 30) {
        return `${days} days ago`;
    } else if (days < 365) {
        const months = Math.floor(days / 30);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        const years = Math.floor(days / 365);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
}


export const useCheckCurrent = () => {
    useEffect(() => {
        const checkUserStatus = () => {
            const admin = Cookies.get('admin');
            const token = Cookies.get('token');
            const currentLocation = window.location.pathname;

            // Define redirection logic
            const shouldRedirectToLogin = () => {
                return (
                    (!admin && currentLocation === '/admin') ||
                    (!admin && !token && currentLocation === '/profile')
                );
            };

            // Logic to handle redirects based on user status
            if (shouldRedirectToLogin()) {
                window.location.href = '/login';
            } else if (admin && currentLocation !== '/admin') {
                // If admin is true and not on admin page, redirect to admin page
                window.location.href = '/admin';
            } else if (token && currentLocation === '/admin') {
                // If token is present, prevent redirect to admin
                window.location.href = '/profile'; // Redirect to profile or another appropriate page
            }
        };

        checkUserStatus(); // Call the function to perform the check
    }, []);
}