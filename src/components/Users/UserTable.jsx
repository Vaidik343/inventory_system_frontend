import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Switch,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useUsers } from "../../context/UserContext";

const UserTable = () => {
  const { users, getAllUsers, updateUser, deactivateUser, loading } =
    useUsers();

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleEditOpen = (user) => {
    setSelectedUser({ ...user });
    setOpen(true);
  };

  const handleEditChange = (field, value) => {
    setSelectedUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    await updateUser(selectedUser._id, {
      role: selectedUser.role,
      isActive: selectedUser.isActive,
    });
    setOpen(false);
  };

  const handleDeactivate = async (id) => {
    if (window.confirm("Deactivate this user?")) {
      await deactivateUser(id);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.isActive ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  {user.last_login
                    ? new Date(user.last_login).toLocaleString()
                    : "-"}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleEditOpen(user)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleDeactivate(user._id)}
                    disabled={!user.isActive}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 🔧 Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update User</DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          <Select
            fullWidth
            value={selectedUser?.role || ""}
            onChange={(e) => handleEditChange("role", e.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
          </Select>

          <Switch
            checked={selectedUser?.isActive || false}
            onChange={(e) =>
              handleEditChange("isActive", e.target.checked)
            }
          />
          Active
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserTable;
