import React, { useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Chip
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useCategory } from "../../context/CategoryContext";

const CategoryTable = () => {
  const {
    categories,
    loading,
    updateCategory,
    deleteCategory
  } = useCategory();

  const [editOpen, setEditOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [name, setName] = useState("");

  const handleEditOpen = (category) => {
    setCurrentCategory(category);
    setName(category.name);
    setEditOpen(true);
  };

  // 💾 Save Update
  const handleUpdate = async () => {
    await updateCategory(currentCategory._id, { name });
    setEditOpen(false);
  };

  // Delete Category
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    await deleteCategory(id);
  };

  if (loading) {
    return < CircularProgress />;
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ background: 'rgba(255, 255, 255, 0.05)' }}>
              <TableCell sx={{ fontWeight: 700, py: 2 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700, py: 2 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, py: 2 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category._id}
                sx={{
                  '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
                  transition: 'all 0.3s ease'
                }}
              >
                <TableCell>{category.name}</TableCell>

                <TableCell>
                  <Chip
                    label={category.isActive ? "Active" : "Inactive"}
                    color={category.isActive ? "success" : "default"}
                    size="small"
                  />
                </TableCell>

                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleEditOpen(category)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleDelete(category._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No categories found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth>
        <DialogTitle>Edit Category</DialogTitle>

        <DialogContent>
          <TextField
            label="Category Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="dense"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CategoryTable;
