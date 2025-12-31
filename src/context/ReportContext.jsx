import React,{useState, useEffect, useContext ,useMemo, createContext, useCallback} from "react";
import api from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";
import { useAuth } from "./AuthContext";
import { resolvePermissions } from "../utils/resolvePermissions";

const ReportContext = createContext(null);

export const ReportProvider = ({children}) => {
    const { userPermissions } = useAuth();

    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(false);

    const getSalesReport = useCallback(async () => {
        const perms = resolvePermissions(userPermissions);
        if (!perms.can("report", "view")) {
            throw new Error("No permission to view reports");
        }

        try {
            setLoading(true);
            const {data} = await api.get(ENDPOINTS.REPORT.SALES);
            setReport(data);
            return data;
        } catch (error) {
            console.log("🚀 ~ getSalesReport ~ error:", error)
            throw error;
        } finally {
            setLoading(false);
        }

    }, [userPermissions])

    const getProfitReport = useCallback(async () => {
        const perms = resolvePermissions(userPermissions);
        if (!perms.can("report", "view")) {
            throw new Error("No permission to view reports");
        }

        try {
            setLoading(true);
            const {data} = await api.get(ENDPOINTS.REPORT.PROFIT);
            setReport(data);
            return data;
        } catch (error) {
            console.log("🚀 ~ getProfitReport ~ error:", error)
            throw error;
        } finally {
            setLoading(false);
        }
    }, [userPermissions])

    const getStockReport = useCallback(async () => {
        const perms = resolvePermissions(userPermissions);
        if (!perms.can("report", "view")) {
            throw new Error("No permission to view reports");
        }

        try {
            setLoading(true);
            const {data} = await api.get(ENDPOINTS.REPORT.STOCK);
            setReport(data);
            return data;
        } catch (error) {
            console.log("🚀 ~ getStockReport ~ error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [userPermissions])

    const value = useMemo( () => ({
        report, loading, getProfitReport,getSalesReport,getStockReport
    }), [report, loading, getProfitReport,getSalesReport,getStockReport])
 
    return(
        <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
    )
}

export const useReport = () => useContext(ReportContext);