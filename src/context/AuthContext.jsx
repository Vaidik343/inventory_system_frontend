import React,{useEffect, useContext, useMemo, createContext, useState} from "react";
import { ENDPOINTS } from "../api/endpoints";
import api from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

// add call back in every function

export const AuthProvider = ({children}) => {
const [user, setUser] = useState(null);
const [accessToken, setAccessToken] = useState(null);
const [loading, setLoading] = useState(false);

//login
const login = async (payload) => {
    try {
        const {data} = await api.post(ENDPOINTS.AUTH.LOGIN, payload);

        const {accessToken} = data;
        setAccessToken(accessToken);

        const decoded = jwtDecode(accessToken);
        setUser(decoded);

        return data;

    } catch (error) {
        console.log("Login error", error);
    } finally {
        setLoading(false);
    }
};

//refresh token
const refreshToken = async () => {
    try {
        const {data} = await api.get(ENDPOINTS.AUTH.REFRESH_TOKEN, {withCredentials: true});

        
        const {accessToken} = data;
        setAccessToken(accessToken);

        const decoded = jwt_decode(accessToken);
        setUser(decoded);

         return accessToken;
    } catch (error) {
        console.log("Refresh token error:", error);
        setUser(null);
        setAccessToken(null);
        throw error;
    }
};

// logout 
const logout = async () => {
    try {
        await api.post(ENDPOINTS.AUTH.LOGOUT, {}, {withCredentials: true});
    } catch (error) {
        console.log("Logout error:", error);
    } finally {
        setUser(null);
        setAccessToken(null);
    }
};

const value = useMemo( ()=> ({
    user,
    accessToken,
    loading,
    login,
    logout
}), [user, accessToken, loading]);
    
return(
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
)
}



export const useAuth = () => useContext(AuthContext);