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
                <TableCell>{user.role?.name || user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isActive ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {user.last_login
                    ? new Date(user.last_login).toLocaleString()
                    : "-"}
                </TableCell>

                <TableCell align="center">
                  <IconButton onClick={() => handleEditOpen(user)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton onClick={() => handlePermissionOpen(user)}>
                    <SecurityIcon />
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

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update User</DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          <Select
            fullWidth
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
