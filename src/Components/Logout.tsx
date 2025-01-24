import React, { useEffect } from 'react';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Logout = () => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        async function logout() {
            if (token && userName) {
                try {
                    await axios.post(
                        `${backendUrl}/api/user/logout`,
                        {},
                        {
                            headers: {
                                "authorization": `Bearer ${token}`,
                            },
                        }
                    );
                    localStorage.removeItem('token');
                    localStorage.removeItem('userName');
                    window.location.href = '/';
                } catch (error) {
                    console.error("Logout failed:", error.response?.data || error.message);
                }
            }
        }
        logout();
    }, [token, userName]);

    return <div>Logging out...</div>;
};

export default Logout;
