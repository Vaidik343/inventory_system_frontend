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
  const { createCategory,deleteCategory, loading } = useCategory();

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
