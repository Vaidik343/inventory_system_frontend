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

        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: 'text.secondary',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              backgroundColor: '#6366f1',
              borderRadius: '8px',
              py: 1,
              px: 3,
              fontWeight: 600,
              textTransform: 'none',
              color: 'white',
              '&:hover': {
                backgroundColor: '#4f46e5',
              },
            }}
          >
            {loading ? "Saving..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
