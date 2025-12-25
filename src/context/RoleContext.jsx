import React,{useState, useContext, useCallback, useMemo, createContext} from "react";
import api from '../api/axiosInstance';
import {ENDPOINTS} from '../api/endpoints'

const RoleContext = createContext(null);

export const RoleProvider = ({children}) => {

    const [role, setRole] = useState([]);
    const [roleID, setRoleId] = useState([]);
    const [loading , setLoading] = useState(false);

    //create
    const createRole = useCallback(async(payload) => {
        try {
            const {data} = await api.post(ENDPOINTS.ROLES.CREATE,payload);
            setRole((prev) => [...prev, role]);
            return data;
        } catch (error) {
            console.log("Error in creating role", error);
            throw error;
        }
    }, [])

    const getAllRoles = useCallback(async () => {
        setLoading(true);
        try {
            const {data} = await api.get(ENDPOINTS.ROLES.ALL);
            setRole(data);
            return data;
        } catch (error) {
            console.log("get role error", error);            
        } finally {
            setLoading(false);
        }
    }, [])

    const getRoleById = useCallback( async (id) => {
        setLoading(true);
        try {
            const {data} = await api.get(ENDPOINTS.ROLES.BY_ID(id));
            setRoleId(data);
            return data;
        } catch (error) {
            console.log("error in get role by id", error);
        } finally {
            setLoading(false);
        }

    }, []) 

    const deleteRole = useCallback( async (id) => {
        try {
            const {data} = await api.delete(ENDPOINTS.ROLES.DELETE(id));
            setRole(data);
            return data
        } catch (error) {
            console.log("role delete error", error)
            
        }
    }, [])

    const value = useMemo(()=> {
        role, setRole, roleID, setRoleId, loading, createRole, getAllRoles, getRoleById, deleteRole

    }, [role, createRole, roleID,getAllRoles, getRoleById, deleteRole])

    return(
        <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
    )

}

export const useRole = () => useContext(RoleContext);