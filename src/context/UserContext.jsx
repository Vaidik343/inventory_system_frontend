import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

const UserContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Get all users
  const getAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(ENDPOINTS.USER.ALL);
      setUsers(data);
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  
  const createUser = useCallback(async (payload) => {
    try {
      const { data } = await api.post(ENDPOINTS.USER.CREATE, payload);
      setUsers((prev) => [...prev, data]);
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }, []);

  const updateUser = useCallback(async (id, payload) => {
    try {
      const { data } = await api.put(ENDPOINTS.USER.UPDATE(id), payload);
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, ...data } : u)));
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }, []);

  // ✅ Soft delete user (deactivate)
  const deactivateUser = useCallback(async (id) => {
    try {
      const { data } = await api.patch(ENDPOINTS.USER.PATCH(id));
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, ...data } : u)));
      return data;
    } catch (error) {
      console.error("Error deactivating user:", error);
      throw error;
    }
  }, []);

  // ✅ Memoized context value
  const value = useMemo(
    () => ({
      users,
      loading,
      getAllUsers,
      createUser,
      updateUser,
      deactivateUser,
    }),
    [users, loading, getAllUsers, createUser, updateUser, deactivateUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// ✅ Custom hook
export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUsers must be used within UsersProvider");
  return context;
};
