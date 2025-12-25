import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useProduct } from "../../context/ProductContext";

export default function ProductCreate() {
  const { createProduct } = useProduct();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    cost: "",
    sell_price: "",
    stock_qty: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createProduct({
        ...form,
        cost: Number(form.cost),
        sell_price: Number(form.sell_price),
        stock_qty: Number(form.stock_qty),
      });

      setOpen(false);
      setForm({
        name: "",
        sku: "",
        cost: "",
        sell_price: "",
        stock_qty: "",
      });
    } catch (err) {
      console.error("Create product failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mb={2}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add Product
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create Product</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                name="name"
                fullWidth
                required
                value={form.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="SKU"
                name="sku"
                fullWidth
                required
                value={form.sku}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Cost Price"
                name="cost"
                type="number"
                fullWidth
                value={form.cost}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Selling Price"
                name="sell_price"
                type="number"
                fullWidth
                value={form.sell_price}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Opening Stock"
                name="stock_qty"
                type="number"
                fullWidth
                value={form.stock_qty}
                onChange={handleChange}
                helperText="Initial stock (cannot be edited later)"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
 