import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

export const SupplierContext = createContext(null);
 
export const SuppliersProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Get all suppliers
  const getAllSuppliers = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(ENDPOINTS.SUPPLIER.ALL);
      console.log("suppliers", data)
      setSuppliers(data);
      return data;
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Create supplier
  const createSupplier = useCallback(async (payload) => {
    try {
      const { data } = await api.post(ENDPOINTS.SUPPLIER.CREATE, payload);
      setSuppliers((prev) => [...prev, data]);
      return data;
    } catch (error) {
      console.error("Error creating supplier:", error);
      throw error;
    }
  }, []);

  // ✅ Update supplier
  const updateSupplier = useCallback(async (id, payload) => {
    try {
      const { data } = await api.put(ENDPOINTS.SUPPLIER.UPDATE(id), payload);
      setSuppliers((prev) => prev.map((s) => (s._id === id ? { ...s, ...data } : s)));
      return data;
    } catch (error) {
      console.error("Error updating supplier:", error);
      throw error;
    }
  }, []);

  // ✅ Delete supplier
  const deleteSupplier = useCallback(async (id) => {
    try {
      const { data } = await api.delete(ENDPOINTS.SUPPLIER.DELETE(id));
      setSuppliers((prev) => prev.filter((s) => s._id !== id));
      return data;
    } catch (error) {
      console.error("Error deleting supplier:", error);
      throw error;
    }
  }, []);

  // ✅ Memoized context value
  const value = useMemo(
    () => ({
      suppliers,
      loading,
      getAllSuppliers,
      createSupplier,
      updateSupplier,
      deleteSupplier,
    }),
    [suppliers, loading, getAllSuppliers, createSupplier, updateSupplier, deleteSupplier]
  );

  return <SupplierContext.Provider value={value}>{children}</SupplierContext.Provider>;
};

// ✅ Custom hook
export const useSuppliers = () => {
  const context = useContext(SupplierContext);
  if (!context) throw new Error("useSuppliers must be used within SuppliersProvider");
  return context;
};
