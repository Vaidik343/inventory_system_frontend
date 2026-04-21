import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import { usePurchase } from "../../context/PurchaseContext";
import { useAuth } from "../../context/AuthContext";
import { resolvePermissions } from "../../utils/resolvePermissions";

const statusColor = (status) => {
  switch (status) {
    case "received":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

const PurchaseTable = () => {
  const { purchases, getAllPurchase, loading } = usePurchase();
  const { userPermissions } = useAuth();

  const perms = resolvePermissions(userPermissions);
  const canViewPurchases = perms.can("purchase", "view");

  useEffect(() => {
    if (canViewPurchases) {
      getAllPurchase();
    }
  }, [canViewPurchases]);

  if (loading) return <Typography>Loading purchases...</Typography>;

  if (!canViewPurchases) {
    return (
      <Box p={3}>
        <Typography variant="h6" color="error">
          You do not have permission to view purchases.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        elevation: 0
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ background: 'rgba(255, 255, 255, 0.05)' }}>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Invoice Date</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Supplier</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Products</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Sub Total</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Tax</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Total</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {purchases.map((purchase) => (
            <TableRow
              key={purchase._id}
              hover
              sx={{
                '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
                transition: 'all 0.3s ease'
              }}
            >
              <TableCell sx={{color:"#312e81 !important"}}>
                {new Date(purchase.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell sx={{color:"#312e81 !important"}}>
                {purchase.supplierId?.name || "—"}
              </TableCell>

              <TableCell>
                {purchase.purchase_items?.length ? (
                  <Typography variant="body2" color="#312e81">
                    No items
                  </Typography>
                ) : (
                  <Box>
                    {purchase.purchase_items?.map((item) => (
                      <Typography
                        key={item._id}
                        variant="body2"
                        color="#312e81"
                      // sx={{color:"#312e81 !important"}}
                      >
                        • {item.productId?.name} ({item.qty} × {item.cost_price})
                      </Typography>
                    ))}
                  </Box>
                )}
              </TableCell>

              <TableCell  sx={{color:"#312e81 !important"}}>₹{purchase.sub_total}</TableCell>
              <TableCell sx={{color:"#312e81 !important"}}>₹{purchase.tax}</TableCell>
              <TableCell  sx={{color:"#312e81 !important"}}>
                <strong >₹{purchase.total}</strong>
              </TableCell>

              <TableCell>
                <Chip
                  label={purchase.status}
                  color={statusColor(purchase.status)}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PurchaseTable;
