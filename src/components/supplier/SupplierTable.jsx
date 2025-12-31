import React, { useEffect } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Box
} from "@mui/material";
import { useSuppliers } from "../../context/SupplierContext";
import { useAuth } from "../../context/AuthContext";
import { resolvePermissions } from "../../utils/resolvePermissions";

const SupplierTable = () => {
  const { suppliers, getAllSuppliers, loading } = useSuppliers();
  const { userPermissions } = useAuth();

  const perms = resolvePermissions(userPermissions);
  const canViewSuppliers = perms.can("supplier", "view");

  useEffect(() => {
    if (canViewSuppliers) {
      getAllSuppliers();
    }
  }, [canViewSuppliers]);

  if (loading) return <CircularProgress />;

  if (!canViewSuppliers) {
    return (
      <Box p={3}>
        <Typography variant="h6" color="error">
          You do not have permission to view suppliers.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Contact Person</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Payment Term</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {suppliers.map((sup) => (
            <TableRow key={sup._id}>
              <TableCell>{sup.name}</TableCell>
              <TableCell>{sup.contact_person}</TableCell>
              <TableCell>{sup.email}</TableCell>
              <TableCell>{sup.phone}</TableCell>
              <TableCell>{sup.payment_term}</TableCell>

              {/* Address */}
              <TableCell>
                {sup.address
                  ? `${sup.address.street}, ${sup.address.city}, ${sup.address.country} - ${sup.address.pin_code}`
                  : "—"}
              </TableCell>

              <TableCell>{sup.note || "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SupplierTable;
