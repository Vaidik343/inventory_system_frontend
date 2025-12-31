export const ENDPOINTS = {
    AUTH: {
        LOGIN:"/auth/login",
        REFRESH_TOKEN:"/refresh",
        LOGOUT:"/logout"
    },
    CATEGORY: {
        CREATE:"/category",
        ALL:"/category",
        UPDATE:(id) =>`/category/${id}`,
        DELETE:(id) =>`/category/${id}`,
    },
 
    PRODUCTS:{
        CREATE:"/products",
        ALL:"/products",
        UPDATE:(id) => `/products/${id}`,
        PATCH: (id) => `/products/${id}`
    },
    PURCHASES:{
        CREATE:"/purchase",
        ALL:"/purchase",
        BY_ID:(id) =>`/purchase/${id}`
    },
    ROLES:{
        CREATE:"/roles",
        ALL:"/roles",
        BY_ID: (id) => `/roles/${id}`,
        DELETE: (id) => `/roles/${id}` //make change in backend for id
        //CHECK and add update
    },
    REPORT: {
        SALES:'/reports/sales-summary',
        PROFIT:'/reports/profit',
        STOCK:'/reports/stock-movements'
    },
    SALES:{ 
        CREATE:"/sales",
        ALL:"/sales",
        BY_ID: (id) => `/sales/${id}`,
        PATCH: (id) => `/sales/${id}/cancel`,
    },
    SETTINGS:{
        CREATE:"/setting",
        ALL:"/setting",
        UPDATE: (id) =>`/setting/${id}` // change to update 
    },
    STOCKADJUSTMENT: {
        CREATE: "/stockAdjust",
        ALL: "/stockAdjust"
    },
    SUPPLIER:{
        CREATE:"/suppliers",
        ALL:"/suppliers",
        UPDATE: (id) => `/suppliers/${id}`,
        DELETE: (id)=>`/suppliers/${id}`
    },
    USER: {
        CREATE:"/user",
        ALL:"/user",
        UPDATE: (id) =>`/user/${id}`, //patch
        PATCH:(id) =>`/user/${id}`,
        MY_PERMISSIONS: "/me/permissions",
        GRANT_PERMISSION: (id) => `/user/${id}/permission/grant`,
        REVOKE_PERMISSION: (id) => `/user/${id}/permission/revoke`
    }
}  