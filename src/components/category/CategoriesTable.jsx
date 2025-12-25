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
    if (confirm("Are you sure you want to delete this category?")) return;
    await deleteCategory(id);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
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
