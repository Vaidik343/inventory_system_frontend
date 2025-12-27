import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRole } from "../../context/RoleContext";

const RoleTable = () => {
  const { roles, getAllRoles, deleteRole, loading } = useRole();

  useEffect(() => {
    getAllRoles();
  }, [getAllRoles]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this role?")) {
      await deleteRole(id);
      getAllRoles();
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role Name</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {roles.length === 0 && (
            <TableRow>
              <TableCell colSpan={2} align="center">
                No roles found
              </TableCell>
            </TableRow>
          )}

          {roles.map((role) => (
            <TableRow key={role._id}>
              <TableCell>{role.name}</TableCell>
              <TableCell align="center">
                <IconButton
                  color="error"
                  onClick={() => handleDelete(role._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoleTable;
