import React, { useState } from "react";
import { useCategory } from "../../context/CategoryContext";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  Box,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CategoryForm = () => {
  const { createCategory, deleteCategory, loading } = useCategory();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createCategory(form);
      setForm({ name: "" });

      setOpen(false);

    } catch (error) {
      console.log("Failed to create category", error);
    }
  };

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
        Add Category
      </Button>

      {/* ✅ Dialog wrapper */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create Category</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                label="Category Name"
                name="name"
                fullWidth
                required
                value={form.name}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || !form.name.trim()}
          >
            {loading ? "Saving..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryForm;
