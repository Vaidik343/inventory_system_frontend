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
} from "@mui/material";
import { useSuppliers } from "../../context/SupplierContext";

const SupplierTable = () => {
  const { suppliers, getAllSuppliers, loading } = useSuppliers();

  useEffect(() => {
    getAllSuppliers();
  }, [getAllSuppliers]);

  if (loading) return <CircularProgress />;

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
