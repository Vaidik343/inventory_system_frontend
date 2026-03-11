import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { useProduct } from "../../context/ProductContext"; // assume you have this
import { useStockAdjustment } from "../../context/StockAdjustmentContext"; // custom context for API
import AddIcon from "@mui/icons-material/Add";

const StockAdjustmentForm = () => {
  const { products, getAllProducts } = useProduct();
  const { createStock } = useStockAdjustment();
  const [open, setOpen] = useState(false);

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
      setOpen(false);
      setForm({ productId: "", changes: 0, reason: "", referenceId: "" });
    } catch (error) {
      console.error("Stock adjustment failed", error);
      alert("Failed to adjust stock");
    }
  };

  return (
    <Box mb={2}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        sx={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: '12px',
          py: 1.2,
          px: 3,
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '15px',
          color: 'white',
          boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
            boxShadow: '0 6px 20px rgba(240, 147, 251, 0.4)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        Adjust Stock
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 600 }}>
          Adjust Stock
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <TextField
            select
            label="Product"
            fullWidth
            value={form.productId}
            onChange={(e) => handleChange("productId", e.target.value)}
            sx={{ mb: 3 }}
          >
            {products.map((p) => (
              <MenuItem key={p._id} value={p._id}>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Typography variant="body2">
                    {p.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Stock: {p.stock_qty}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Change Quantity"
            type="number"
            fullWidth
            value={form.changes}
            onChange={(e) =>
              handleChange("changes", Number(e.target.value))
            }
            sx={{ mb: 3 }}
            helperText="Use positive for increase, negative for decrease"
          />

          <TextField
            label="Reason"
            fullWidth
            value={form.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Reference ID (optional)"
            fullWidth
            value={form.referenceId}
            onChange={(e) =>
              handleChange("referenceId", e.target.value)
            }
            sx={{ mb: 4 }}
          />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              onClick={() => setOpen(false)}
              color="inherit"
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ borderRadius: 2 }}
            >
              Submit
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );

};

export default StockAdjustmentForm;
