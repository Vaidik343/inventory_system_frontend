import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Chip,
  Stack,
  Alert,
} from "@mui/material";
import { useUsers } from "../../context/UserContext";
import { resolvePermissions } from "../../utils/resolvePermissions";

const PermissionDialog = ({ open, onClose, user }) => {
  const { grantPermission, revokePermission } = useUsers();
  const [resource, setResource] = useState("");
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!user) return null;

  const perms = resolvePermissions(user);

  const handleGrant = async () => {
    if (!resource || !action) {
      setMessage("Please enter both resource and action");
      return;
    }

    try {
      setLoading(true);
      await grantPermission(user._id, resource, action);
      setMessage("Permission granted successfully");
      setResource("");
      setAction("");
    } catch (error) {
      setMessage("Failed to grant permission");
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (permResource, permAction) => {
    try {
      setLoading(true);
      await revokePermission(user._id, permResource, permAction);
      setMessage("Permission revoked successfully");
    } catch (error) {
      setMessage("Failed to revoke permission");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setMessage("");
    setResource("");
    setAction("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Manage Permissions - {user.email}</DialogTitle>

      <DialogContent>
        {message && (
          <Alert severity={message.includes("success") ? "success" : "error"} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        {/* Current Permissions */}
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Current Permissions
          </Typography>

          <Typography variant="subtitle2" color="text.secondary">
            Role Permissions:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            {(user.role?.permissions || []).map((perm, index) => (
              <Chip
                key={index}
                label={typeof perm === "string" ? perm : `${perm.resource}:${perm.action}`}
                size="small"
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>

          <Typography variant="subtitle2" color="text.secondary">
            Extra Permissions:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            {(user.extraPermissions || []).map((perm, index) => (
              <Chip
                key={index}
                label={`${perm.resource}:${perm.action}`}
                size="small"
                color="success"
                onDelete={() => handleRevoke(perm.resource, perm.action)}
                disabled={loading}
              />
            ))}
          </Stack>

          <Typography variant="subtitle2" color="text.secondary">
            Revoked Permissions:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {(user.revokedPermissions || []).map((perm, index) => (
              <Chip
                key={index}
                label={`${perm.resource}:${perm.action}`}
                size="small"
                color="error"
                variant="outlined"
              />
            ))}
          </Stack>
        </Box>

        {/* Grant New Permission */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Grant New Permission
          </Typography>

          <Box display="flex" gap={2} alignItems="center">
            <TextField
              label="Resource"
              value={resource}
              onChange={(e) => setResource(e.target.value)}
              size="small"
              placeholder="e.g., report, user, sale"
            />
            <TextField
              label="Action"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              size="small"
              placeholder="e.g., view, create, update"
            />
            <Button
              variant="contained"
              onClick={handleGrant}
              disabled={loading || !resource || !action}
            >
              Grant
            </Button>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PermissionDialog;
