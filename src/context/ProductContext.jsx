import React,{useState, useMemo, createContext, useCallback, useContext} from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";


const ProductContext = createContext(null);

export const ProductProvider = ({children}) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    //create
    const createProducts = useCallback(async (payload) => {
        try {
            const {data} = await api.post(ENDPOINTS.PRODUCTS.CREATE,payload);
               setProducts((prev) =>[...prev , data]);
               return data;
        } catch (error) {
            console.log("Error while creating product",error);
            throw error;
        }
    }, []);

    const getAllProducts = useCallback(async() => {
        setLoading(true);
        try {
            const {data} = await api.get(ENDPOINTS.PRODUCTS.ALL);
            console.log("all product", data)
            setProducts(data);
            return data;
        } catch (error) {
            console.log("Error in fetching product", error);
        } finally {
            setLoading(false);
        }
    }, [])

    const updateProducts = useCallback(async (id, payload)=> {
        try {
            const {data} = await api.put(ENDPOINTS.PRODUCTS.UPDATE(id), payload);

             setProducts( (prev) => prev.map(prod => (prod._id === id ? data : prod)))
             return data;
        } catch (error) {
            console.log("Error in update product!");
              throw error;
        }
    }, []);


    // soft delete
    const deactivateProduct = useCallback(async (id) => {
        try {
            const {data} = await api.patch(ENDPOINTS.PRODUCTS.PATCH(id));

            setProducts( (prev) => 
               prev.map((p) => p._id === id ? {...p, isActive: false} : p)
            );

            return data;
        } catch (error) {
            console.log("Error in deactivate product", error)
            throw error
        }
    }, [])

    const value = useMemo(()=> ({
        products, loading, deactivateProduct, updateProducts,getAllProducts,createProducts
    }),[products, loading, deactivateProduct, updateProducts,getAllProducts,createProducts])

    return (
        <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
    )
} 

export const useProduct = () => useContext(ProductContext);