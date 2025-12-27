import React, {
  useState,
  useCallback,
  useContext,
  useMemo,
  createContext,
} from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

const SalesContext = createContext(null);

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);
  // const [salesId, setSalesId] = useState([]);
  const [loading, setLoading] = useState(false);

  const createSales = useCallback(async (payload) => {
    try {
      const { data } = await api.post(ENDPOINTS.SALES.CREATE,payload);
      setSales((prev) => [...prev, data]);
      return data;
    } catch (error) {
      console.log("sale create error", error);
      throw error;
    }
  }, []);

  const getAllSales = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(ENDPOINTS.SALES.ALL);
      console.log("🚀 ~ SalesProvider ~ data:", data)
      setSales(data.sales ||data);
      return data.sales ||data;
    } catch (error) {
      console.log("Error in fetching list of sales", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSalesById = useCallback(async (id) => {
    setLoading(true);
    try {
      const { data } = await api.get(ENDPOINTS.SALES.BY_ID(id));

      return data;
    } catch (error) {
      console.log("error in getting sales by id", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelSale = useCallback(async (id) => {
    try {
      const { data } = await api.patch(ENDPOINTS.SALES.PATCH(id),{});
      setSales((prev) =>
        prev.map((p) => (p._id === id ? { ...p, isActive: "cancelled" } : p))
      );

      return data;
    } catch (error) {
      console.log("Error in sales cancel", error);
      throw error;
    }
  }, []); 

  const value = useMemo(() => ({
    sales,
      // salesId,
   
      loading,
      setLoading,
      createSales,
      getAllSales,
      getSalesById,
      cancelSale
  }), [sales,loading,  createSales, getAllSales, getSalesById, cancelSale]);

  return (
    <SalesContext.Provider value={value}>{children}</SalesContext.Provider>
  );
};

export const useSales = () => useContext(SalesContext);
