import React,{useEffect, useContext, useMemo, createContext, useState} from "react";
import { ENDPOINTS } from "../api/endpoints";
import api from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

// add call back in every function

export const AuthProvider = ({children}) => {
const [user, setUser] = useState(null);
const [accessToken, setAccessToken] = useState(null);
const [userPermissions, setUserPermissions] = useState(null);
const [loading, setLoading] = useState(true); // Start with true for initial check

// Initialize auth state on mount
useEffect(() => {
  const init = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        await refreshToken();
      } else {
        setUser(decoded);
        setAccessToken(token);
      }
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  init();
}, []);



//login
const login = async (payload) => {
    try {
        setLoading(true);
        const {data} = await api.post(ENDPOINTS.AUTH.LOGIN, payload);

        // const {accessToken} = data;
        // setAccessToken(accessToken);

        // Store token in localStorage
     localStorage.setItem("accessToken", data.accessToken);

  const decoded = jwtDecode(data.accessToken);
  setUser(decoded);
  setAccessToken(data.accessToken);
        

        // Fetch user permissions after login
        // await fetchUserPermissions();

        return data;

    } catch (error) {
        console.log("Login error", error);
        throw error;
    } finally {
        setLoading(false);
    }
};

//refresh token
const refreshToken = async () => {
  try {
    const { data } = await api.get(
      ENDPOINTS.AUTH.REFRESH_TOKEN,
      { withCredentials: true }
    );
    console.log("🚀 ~ refreshToken ~ data:", data)

    const { accessToken } = data;

    localStorage.setItem("accessToken", accessToken);
    setAccessToken(accessToken);

    const decoded = jwtDecode(accessToken);
    setUser(decoded);


    return accessToken;
  } catch (error) {
    console.log("Refresh token error:", error);
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    throw error;
  }
};


// fetch user permissions
const fetchUserPermissions = async () => {
    try {
        const {data} = await api.get(ENDPOINTS.USER.MY_PERMISSIONS);
        console.log("🚀 ~ fetchUserPermissions ~ data:", data)
        setUserPermissions(data.permissions);
        return data.permissions;
    } catch (error) {
        console.log("Fetch permissions error:", error);
        setUserPermissions(null);
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
        setUserPermissions(null);
        localStorage.removeItem('accessToken');
    }
};

 useEffect(() => {
    if (user && accessToken) {
      fetchUserPermissions();
    }
  }, [user, accessToken]);
const value = useMemo( ()=> ({
    user,
    accessToken,
    userPermissions,
    loading,
    login,
    logout,
    refreshToken,
    fetchUserPermissions // Export fetchUserPermissions so it can be used elsewhere if needed
}), [user, accessToken, userPermissions, loading]);

    
return(
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
)
}



export const useAuth = () => useContext(AuthContext);