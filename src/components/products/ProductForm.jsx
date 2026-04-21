import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useProduct } from "../../context/ProductContext";
import { useCategory } from "../../context/CategoryContext";
import { useSuppliers } from './../../context/SupplierContext';

export default function ProductCreate() {

   useEffect(() => {
  getAllCategories();
  getAllSuppliers();
}, []);
  const { createProducts } = useProduct();
const { categories, getAllCategories } = useCategory();
const { suppliers, getAllSuppliers } = useSuppliers();

 
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    description: "",
    categoryId: "",
    supplierId: "",
    unit: "",
    cost: "",
    sell_price: "",
    tax_rate: "",
    stock_qty: "",
    image:null
  });

const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (files) {
    setForm((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  } else {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

const handleSubmit = async () => {
  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("sku", form.sku);
    formData.append("description", form.description);
    formData.append("categoryId", form.categoryId);
    formData.append("supplierId", form.supplierId);
    formData.append("unit", form.unit);
    formData.append("cost", Number(form.cost));
    formData.append("sell_price", Number(form.sell_price));
    formData.append("tax_rate", Number(form.tax_rate));
    formData.append("stock_qty", Number(form.stock_qty));

    if (form.image) {
      formData.append("image", form.image);
    }

    const proCrt = await createProducts(formData);

    console.log("Created product:", proCrt);

    setOpen(false);
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
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                required
                value={form.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={5}>
  <TextField
    select
    label="Category"
    name="categoryId"
    fullWidth
    value={form.categoryId}
    onChange={handleChange}
  >
    {categories.map((cat) => (
      <MenuItem key={cat._id} value={cat._id}>
        {cat.name}
      </MenuItem>
    ))}
  </TextField>
</Grid>

<Grid item xs={5}>
  <TextField
    select
    label="Supplier"
    name="supplierId"
    fullWidth
    value={form.supplierId}
    onChange={handleChange}
  >
    {suppliers.map((sup) => (
      <MenuItem key={sup._id} value={sup._id}>
        {sup.name}
      </MenuItem>
    ))}
  </TextField>
</Grid>
           <Grid item xs={12}>
  <TextField
    select
    label="Unit"
    name="unit"
    fullWidth
    value={form.unit}
    onChange={handleChange}
  >
    <MenuItem value="pcs">Pieces</MenuItem>
    <MenuItem value="kg">Kilogram</MenuItem>
    <MenuItem value="ltr">Liter</MenuItem>
    <MenuItem value="box">Box</MenuItem>
  </TextField>
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
            <Grid item xs={6}>
              <TextField
                label="Tax Rate"
                name="tax_rate"
                type="number"
                fullWidth
                value={form.tax_rate}
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
