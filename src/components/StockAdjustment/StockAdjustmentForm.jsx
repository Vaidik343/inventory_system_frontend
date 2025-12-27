import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { useProduct } from "../../context/ProductContext"; // assume you have this
import { useStockAdjustment } from "../../context/StockAdjustmentContext"; // custom context for API

const StockAdjustmentForm = () => {
  const { products, getAllProducts } = useProduct();
  const { createStock } = useStockAdjustment();

  const [form, setForm] = useState({
    productId: "",
    changes: 0,
    reason: "",
    referenceId: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.productId || !form.reason || form.changes === 0) return;

    try {
      await createStock(form);
      alert("Stock adjusted successfully!");
      setForm({ productId: "", changes: 0, reason: "", referenceId: "" });
    } catch (error) {
      console.error("Stock adjustment failed", error);
      alert("Failed to adjust stock");
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Adjust Stock
      </Typography>

      <TextField
        select
        label="Product"
        fullWidth
        value={form.productId}
        onChange={(e) => handleChange("productId", e.target.value)}
        sx={{ mb: 2 }}
      >
        {products.map((p) => (
          <MenuItem key={p._id} value={p._id}>
            {p.name} (Current: {p.stock_qty})
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Change Quantity"
        type="number"
        fullWidth
        value={form.changes}
        onChange={(e) => handleChange("changes", Number(e.target.value))}
        sx={{ mb: 2 }}
      />
 
      <TextField
        label="Reason"
        fullWidth
        value={form.reason}
        onChange={(e) => handleChange("reason", e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Reference ID (optional)"
        fullWidth
        value={form.referenceId}
        onChange={(e) => handleChange("referenceId", e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Paper>
  );
};

export default StockAdjustmentForm;
