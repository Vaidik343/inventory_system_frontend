import React,{useEffect, useState, createContext, useCallback, useMemo, useContext} from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

const PurchaseContext = createContext(null);

export const PurchaseProvider = ({children}) => {

    const [purchases, setPurchase] = useState([]);
    const [loading, setLoading] = useState(false);

    //create
    const createPurchase = useCallback(async(payload) => {
        try {
            const {data} = await api.post(ENDPOINTS.PURCHASES.CREATE,payload)
            setPurchase((prev) => [...prev, data]);
            return data;

        } catch (error) {
            console.log("Error in purchase create", error);
            throw error
            
        }
    })

    const getAllPurchase = useCallback( async() => {
        setLoading(true);
        try {
        const {data} = await api.get(ENDPOINTS.PURCHASES.ALL);
        setPurchase(data);
        return data;
        } catch (error) {
            console.log("Purchase list fetch error!");
        } finally {
            setLoading(false)
        }
    })

    const purchaseById = useCallback( async(id) => {
         setLoading(true);
        try {
            const {data} = await api.get(ENDPOINTS.PURCHASES.BY_ID(id))    
            setPurchase(data);
            return data;
        } catch (error) {
            console.log("Purchase by id:", error)
            
        } finally {
            setLoading(false)
        }

    })

   const value = useMemo(() => ({
  purchases,
  setPurchase,
  loading,
  getAllPurchase,
  purchaseById,
  createPurchase,
}), [purchases, loading, getAllPurchase, purchaseById, createPurchase]);


    return(
        <PurchaseContext.Provider value={value}>{children}</PurchaseContext.Provider>
    )
}

export const usePurchase = () => useContext(PurchaseContext)