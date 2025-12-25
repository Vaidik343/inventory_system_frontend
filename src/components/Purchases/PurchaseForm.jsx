import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Grid,
  Paper,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { usePurchase } from "../../context/PurchaseContext";
import { useProduct } from "../../context/ProductContext";
import { useSuppliers } from "../../context/SupplierContext";

const emptyItem = {
  productId: "",
  qty: 1,
  cost_price: 0,
  batch_No: "",
  expiry: "",
};

const PurchaseForm = () => {
  const { createPurchase } = usePurchase();
  const { products, getAllProducts } = useProduct();
  const { suppliers, getAllSuppliers } = useSuppliers();

  const [form, setForm] = useState({
    supplierId: "",
    tax: 0,
    invoice_file_path: "",
    items: [{ ...emptyItem }],
  });

  useEffect(() => {
    getAllProducts();
    getAllSuppliers();
  }, [getAllProducts, getAllSuppliers]);

  // 🧮 calculations
  const subTotal = useMemo(() => {
    return form.items.reduce(
      (sum, i) => sum + Number(i.qty || 0) * Number(i.cost_price || 0),
      0
    );
  }, [form.items]);

  const total = useMemo(
    () => subTotal + Number(form.tax || 0),
    [subTotal, form.tax]
  );

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...form.items];
    updatedItems[index][field] = value;

    setForm((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { ...emptyItem }],
    }));
  };

  const removeItem = (index) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!form.supplierId || form.items.length === 0) return;

    try {
      await createPurchase(form);

      // reset
      setForm({
        supplierId: "",
        tax: 0,
        invoice_file_path: "",
        items: [{ ...emptyItem }],
      });
    } catch (error) {
      console.error("Purchase failed", error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create Purchase
      </Typography>

      {/* Supplier */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Supplier"
            fullWidth
            value={form.supplierId}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, supplierId: e.target.value }))
            }
          >
            {suppliers.map((s) => (
              <MenuItem key={s._id} value={s._id}>
                {s.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Tax"
            type="number"
            fullWidth
            value={form.tax}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, tax: e.target.value }))
            }
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Invoice Path"
            fullWidth
            value={form.invoice_file_path}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                invoice_file_path: e.target.value,
              }))
            }
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Items */}
      <Typography variant="subtitle1">Purchase Items</Typography>

      {form.items.map((item, index) => (
        <Grid container spacing={2} key={index} mt={1} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              select
              label="Product"
              fullWidth
              value={item.productId}
              onChange={(e) =>
                handleItemChange(index, "productId", e.target.value)
              }
            >
              {products.map((p) => (
                <MenuItem key={p._id} value={p._id}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6} md={2}>
            <TextField
              label="Qty"
              type="number"
              fullWidth
              value={item.qty}
              onChange={(e) =>
                handleItemChange(index, "qty", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={6} md={2}>
            <TextField
              label="Cost Price"
              type="number"
              fullWidth
              value={item.cost_price}
              onChange={(e) =>
                handleItemChange(index, "cost_price", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={6} md={2}>
            <TextField
              label="Batch No"
              fullWidth
              value={item.batch_No}
              onChange={(e) =>
                handleItemChange(index, "batch_No", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={6} md={2}>
            <TextField
              type="date"
              label="Expiry"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={item.expiry}
              onChange={(e) =>
                handleItemChange(index, "expiry", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={12} md={1}>
            <IconButton onClick={() => removeItem(index)} color="error">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Button startIcon={<AddIcon />} onClick={addItem} sx={{ mt: 2 }}>
        Add Item
      </Button>

      <Divider sx={{ my: 3 }} />

      <Typography>Sub Total: ₹{subTotal}</Typography>
      <Typography>Total: ₹{total}</Typography>

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        Save Purchase
      </Button>
    </Paper>
  );
};

export default PurchaseForm;
