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

import { useSales } from "../../context/SalesContext";
import { useProduct } from "../../context/ProductContext";

const emptyItem = {
  productId: "",
  quantity: 1,
  sell_price: 0,
  discount: 0,
};
    
const SalesForm = () => {
  const { createSales } = useSales();
  const { products, getAllProducts } = useProduct();

  const [form, setForm] = useState({
    payment_status: "pending",
    items: [{ ...emptyItem }],
  });

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  /** 🧮 Calculations */
  const subTotal = useMemo(() => {
    return form.items.reduce((sum, i) => {
      const qty = Number(i.quantity || 0);
      const price = Number(i.sell_price || 0);
      const discount = Number(i.discount || 0);
      return sum + qty * price - discount;
    }, 0);
  }, [form.items]);

  const total = subTotal;

  /** Item handlers */
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

  /** Submit */
  const handleSubmit = async () => {
    if (form.items.length === 0) return;

    try {
      await createSales(form);

      // reset
      setForm({
        payment_status: "pending",
        items: [{ ...emptyItem }],
      });
    } catch (error) {
      console.error("Sale creation failed", error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create Sale
      </Typography>

      {/* Payment Status */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            select
            label="Payment Status"
            fullWidth
            value={form.payment_status}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                payment_status: e.target.value,
              }))
            }
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Items */}
      <Typography variant="subtitle1">Sales Items</Typography>

      {form.items.map((item, index) => (
        <Grid container spacing={2} key={index} mt={1} alignItems="center">
          <Grid item xs={12} md={4}>
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
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={6} md={2}>
            <TextField
              label="Sell Price"
              type="number"
              fullWidth
              value={item.sell_price}
              onChange={(e) =>
                handleItemChange(index, "sell_price", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={6} md={2}>
            <TextField
              label="Discount"
              type="number"
              fullWidth
              value={item.discount}
              onChange={(e) =>
                handleItemChange(index, "discount", e.target.value)
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
      <Typography>
        <strong>Total: ₹{total}</strong>
      </Typography>

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        Save Sale
      </Button>
    </Paper>
  ); 
};

export default SalesForm;
