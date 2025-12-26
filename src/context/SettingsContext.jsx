import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Get all settings
  const getAllSettings = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(ENDPOINTS.SETTINGS.ALL);
      setSettings(data);
      return data;
    } catch (error) {
      console.error("Error fetching settings:", error);
      throw error;
    } finally {
      setLoading(false);
    }  
  }, []); 
 
  // ✅ Create a setting
  const createSetting = useCallback(async (payload) => {
    try {
      const { data } = await api.post(ENDPOINTS.SETTINGS.CREATE, payload);
      setSettings((prev) => [...prev, data]);
      return data;
    } catch (error) {
      console.error("Error creating setting:", error);
      throw error;
    }
  }, []); 

  // ✅ Update a setting
  const updateSetting = useCallback(async (id, payload) => {
    try {
      const { data } = await api.put(`${ENDPOINTS.SETTINGS.BY_ID}/${id}`, payload);
      setSettings((prev) =>
        prev.map((s) => (s._id === id ? { ...s, ...data } : s))
      );
      return data;
    } catch (error) {
      console.error("Error updating setting:", error);
      throw error;
    }
  }, []);

  // ✅ Memoized context value
  const value = useMemo(
    () => ({
      settings,
      loading,
      getAllSettings,
      createSetting,
      updateSetting,
    }),
    [settings, loading, getAllSettings, createSetting, updateSetting]
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
};

// ✅ Custom hook
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within SettingsProvider");
  return context;
};
