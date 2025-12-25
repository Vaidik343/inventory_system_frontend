import React, {
  useState,
  useContext,
  useCallback,
  useMemo,
  createContext,
} from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

const StockAdjustmentContext = createContext(null);

export const StockProvider = ({ children }) => {
  const [stk, setStk] = useState([]);
  const [loading, setLoading] = useState(false);

  const createStock = useCallback(async (payload) => {
    try {
      const { data } = await api.post(
        ENDPOINTS.STOCKADJUSTMENT.CREATE,payload
      );
      setStk((prev) => [...prev, data]);
      return data;
    } catch (error) {
      console.log("Stock create error", error);
      throw error;
    }
  }, []);

  const getAllSTKADJ = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(ENDPOINTS.STOCKADJUSTMENT.ALL);
      setStk(data);
      return data;
    } catch (error) {
      console.log("error is Stock adjustment list ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(() => {
    stk, loading, createStock, getAllSTKADJ;
  }, [stk, loading, createStock, getAllSTKADJ]);

  return (
    <StockAdjustmentContext.Provider value={value}>
      {children}
    </StockAdjustmentContext.Provider>
  );
};

export const useStock = () => useContext(StockAdjustmentContext);
