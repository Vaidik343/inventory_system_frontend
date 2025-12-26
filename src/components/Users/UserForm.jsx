import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  MenuItem,
  Switch,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useUsers } from "../../context/UserContext";
import { useRole } from "../../context/RoleContext";

const initialForm = {
  email: "",
  password: "",
  role: "",
  isActive: true,
};

const UserForm = () => {
  const { createUser, loading } = useUsers();
  const { roles, getAllRoles } = useRole();
  console.log("🚀 ~ UserForm ~ role:", roles)

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    getAllRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createUser(form);
      setForm(initialForm);
    } catch (error) {
      console.error("Failed to create user", error);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create User
      </Typography>

      <Grid container spacing={2}>
        {/* Email */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            required
            value={form.email}
            onChange={handleChange}
          />
        </Grid>

        {/* Password */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            required
            value={form.password}
            onChange={handleChange}
          />
        </Grid>

        {/* Role dropdown */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Role"
            name="role"
            fullWidth
            required
            value={form.role}
            onChange={handleChange}
          >
            {roles.map((r) => (
              <MenuItem key={r._id} value={r.name}>
                {r.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Active switch */}
        <Grid item xs={12} md={6} alignItems="center">
          <Typography component="span" sx={{ mr: 2 }}>
            Active
          </Typography>
          <Switch
            checked={form.isActive}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                isActive: e.target.checked,
              }))
            }
          />
        </Grid>
      </Grid>

      <Box mt={3}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save User"}
        </Button>
      </Box>
    </Paper>
  );
};

export default UserForm;
