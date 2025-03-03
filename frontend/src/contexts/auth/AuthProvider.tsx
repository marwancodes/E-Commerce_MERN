import { FC, PropsWithChildren, useState } from 'react';
import { AuthContext } from './AuthContext';

// Variable Keys
const USERNAME_KEY = 'username';
const TOKEN_KEY = 'token';


const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

    const [username, setUsername] = useState<string | null>(localStorage.getItem(USERNAME_KEY));
    const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));
    const [myOrders, setMyOrders] = useState([]);

    const isAuthenticated = !!token; // converting token into a boolean representation of its truthy or falsy value


    const login = (username: string, token: string) => {
        setUsername(username);
        setToken(token);
        localStorage.setItem(USERNAME_KEY, username);
        localStorage.setItem(TOKEN_KEY, token);
    }

    const logout = () => {
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(TOKEN_KEY);
        setUsername(null);
        setToken(null);
    }

    const getMyOrders = async () => {
        // Make the call to API to get the orders
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/my-orders`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch orders');
            return;
        }

        const data = await response.json();
        setMyOrders(data);
    }

    return (
        <AuthContext.Provider
            value={{
                username,
                token,
                isAuthenticated,
                myOrders,
                login,
                logout,
                getMyOrders
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;