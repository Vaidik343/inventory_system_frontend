import React,{useEffect, useState,useContext, createContext, useMemo, useCallback} from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

const CategoryContext = createContext();



export const CategoriesProvider = ({children}) => {
const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
    
const createCategory = async (payload) => {
    try {
        const {data} = await api.post(ENDPOINTS.CATEGORY.CREATE, payload);
        setCategories(prev =>[...prev , data])
        return data;
    } catch (error) {
        console.log("error while creating category", error)
    }
      
}

const getAllCategories = async () => {
    try {
        const {data} = await api.get(ENDPOINTS.CATEGORY.ALL);
        console.log("category", data)
      setCategories(data);
      return data;
    } catch (error) {
         console.log("error while fetching categories", error)
        
    }  finally {
      setLoading(false);
    }
}


const updateCategory = async (id, payload) => {
    try {
        const {data} = await api.put(ENDPOINTS.CATEGORY.UPDATE(id),payload);

          setCategories(prev =>
      prev.map(cat => (cat._id === id ? data : cat))
    );
        return data;
    } catch (error) {
        console.log("Error in update category");        
    }
}

const deleteCategory = async (id) => {
  setLoading(true)
  try {
    const {data} = await api.delete(ENDPOINTS.CATEGORY.DELETE(id))
 setCategories((prev) => prev.filter((cat) => cat._id !== id));

    return true;
  } catch (error) {
    console.log("category delete error", error);
  } finally {
    setLoading(false)
  }

}

  const value = useMemo(() => ({
    categories,
    loading,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
  }), [categories,
        getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
  ]);



    return(
       <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider> 

    )
}

export const useCategory = () => useContext(CategoryContext);