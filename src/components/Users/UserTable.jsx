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
  Box,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityIcon from "@mui/icons-material/Security";

import { useUsers } from "../../context/UserContext";
import { useRole } from "../../context/RoleContext";
import { useAuth } from "../../context/AuthContext";
import { resolvePermissions } from "../../utils/resolvePermissions";
import PermissionDialog from "./PermissionDialog";

const UserTable = () => {
  const { users, getAllUsers, updateUser, deactivateUser, loading } =
    useUsers();

  const { roles, getAllRoles } = useRole();
  const { userPermissions } = useAuth();

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [permissionOpen, setPermissionOpen] = useState(false);
  const [selectedUserForPermission, setSelectedUserForPermission] = useState(null);

  const perms = resolvePermissions(userPermissions);
  const canViewUsers = perms.can("user", "view");

  useEffect(() => {
    if (canViewUsers) {
      getAllUsers();
      getAllRoles();
    }
  }, [getAllUsers, getAllRoles, canViewUsers]);

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

  const handlePermissionOpen = (user) => {
    setSelectedUserForPermission(user);
    setPermissionOpen(true);
  };

  if (loading) return <CircularProgress />;

  if (!canViewUsers) {
    return (
      <Box p={3}>
        <Typography variant="h6" color="error">
          You do not have permission to view users.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer
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
            <TableRow
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <TableCell sx={{ fontWeight: 700, py: 2 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 700, py: 2 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700, py: 2 }}>Active</TableCell>
              <TableCell sx={{ fontWeight: 700, py: 2 }}>Last Login</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, py: 2 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                hover
                sx={{
                  '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
                  transition: 'all 0.3s ease'
                }}
              >
                <TableCell>{user.role?.name || user.role}</TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: user.isActive ? "success.main" : "error.main",
                    }}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </Typography>
                </TableCell>

                <TableCell>
                  {user.last_login
                    ? new Date(user.last_login).toLocaleString()
                    : "-"}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    onClick={() => handleEditOpen(user)}
                    sx={{
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => handlePermissionOpen(user)}
                    sx={{
                      "&:hover": { color: "info.main" },
                    }}
                  >
                    <SecurityIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => handleDeactivate(user._id)}
                    disabled={!user.isActive}
                    sx={{
                      color: "error.main",
                      "&:hover": {
                        bgcolor: "error.light",
                        color: "#fff",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update User</DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Select
              fullWidth
              size="small"
              value={selectedUser?.role?._id || selectedUser?.role || ""}
              onChange={(e) =>
                handleEditChange("role", e.target.value)
              }
            >
              {roles.map((role) => (
                <MenuItem key={role._id} value={role._id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body2">User Active</Typography>
              <Switch
                checked={selectedUser?.isActive || false}
                onChange={(e) =>
                  handleEditChange("isActive", e.target.checked)
                }
                color="success"
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{ borderRadius: 2 }}
          >
            Update User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Permission Dialog */}
      <PermissionDialog
        open={permissionOpen}
        onClose={() => setPermissionOpen(false)}
        user={selectedUserForPermission}
      />
    </>
  );

};

export default UserTable;
