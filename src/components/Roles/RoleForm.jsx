import React, { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useRole } from "../../context/RoleContext";

const RoleForm = ({ selectedRole, onSuccess }) => {
  const { createRole, getAllRoles, loading } = useRole();
  const [name, setName] = useState("");

  useEffect(() => {
    if (selectedRole) {
      setName(selectedRole.name);
    }
  }, [selectedRole]);

  const handleSubmit = async () => {
    if (!name.trim()) return alert("Role name is required");

    try {
      await createRole({ name });
      setName("");
      getAllRoles();
      onSuccess?.();
    } catch (error) {
      console.error("Error saving role");
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create Role
      </Typography>

      <TextField
        label="Role Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Box mt={2}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Role"}
        </Button>
      </Box>
    </Paper>
  );
};

export default RoleForm;
