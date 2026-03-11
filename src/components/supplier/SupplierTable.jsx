import React, { useEffect } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Paper, Typography,
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
    <TableContainer
      component={Paper}
      sx={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Contact Person</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Phone</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Payment Term</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Address</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Note</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {suppliers.map((sup) => (
            <TableRow
              key={sup._id}
              hover
              sx={{
                '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
                transition: 'all 0.3s ease'
              }}
            >
              <TableCell>{sup.name}</TableCell>
              <TableCell>{sup.contact_person}</TableCell>
              <TableCell>{sup.email}</TableCell>
              <TableCell>{sup.phone}</TableCell>
              <TableCell>{sup.payment_term}</TableCell>

              {/* Address */}
              <TableCell>
                {sup.address ? (
                  <Typography variant="body2" color="text.secondary">
                    {`${sup.address.street}, ${sup.address.city}, ${sup.address.country} - ${sup.address.pin_code}`}
                  </Typography>
                ) : (
                  "—"
                )}
              </TableCell>

              <TableCell>
                {sup.note ? (
                  <Typography variant="body2" color="text.secondary">
                    {sup.note}
                  </Typography>
                ) : (
                  "—"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

};

export default SupplierTable;
