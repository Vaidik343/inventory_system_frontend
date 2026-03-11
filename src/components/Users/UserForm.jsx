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
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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

  const [open, setOpen] = useState(false);

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
      setOpen(false);
      setForm(initialForm);
    } catch (error) {
      console.error("Failed to create user", error);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box mb={2}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: '#ec4899',
          borderRadius: '12px',
          py: 1.2,
          px: 3,
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '15px',
          color: 'white',
          boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)',
          '&:hover': {
            backgroundColor: '#db2777',
            boxShadow: '0 6px 20px rgba(240, 147, 251, 0.4)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        Create User
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: 600 }}>
          Create User
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
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

            {/* Role */}
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

            {/* Active Switch */}
            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  px: 2,
                  py: 1.5,
                }}
              >
                <Typography variant="body2" fontWeight={500}>
                  User Active
                </Typography>
                <Switch
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                  color="success"
                />
              </Box>
            </Grid>
          </Grid>

          <Box
            mt={4}
            display="flex"
            justifyContent="flex-end"
            gap={2}
          >
            <Button
              onClick={() => setOpen(false)}
              color="inherit"
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{ borderRadius: 2 }}
            >
              {loading ? "Saving..." : "Save User"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );

};

export default UserForm;
