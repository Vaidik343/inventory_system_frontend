    import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useSuppliers } from "../../context/SupplierContext";

const initialForm = {
  name: "",
  contact_person: "",
  phone: "",
  email:"",
  payment_term: "",
  note: "",
  address: {
    street: "",
    city: "",
    country: "",
    pin_code: "",
  },
};

const SupplierForm = () => {
  const { createSupplier, loading } = useSuppliers();
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // handle nested address
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
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
        
      await createSupplier(form);
      setForm(initialForm);
    } catch (error) {
      console.error("Error while creating supplier", error);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create Supplier
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Supplier Name"
            name="name"
            fullWidth
            required
            value={form.name}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Contact Person"
            name="contact_person"
            fullWidth
            required
            value={form.contact_person}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            required
            value={form.phone}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            required
            value={form.email}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Payment Term"
            name="payment_term"
            fullWidth
            required
            value={form.payment_term}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Note"
            name="note"
            fullWidth
            required
            value={form.note}
            onChange={handleChange}
          />
        </Grid>

        {/* Address */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Street"
            name="address.street"
            fullWidth
            required
            value={form.address.street}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="City"
            name="address.city"
            fullWidth
            required
            value={form.address.city}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Country"
            name="address.country"
            fullWidth
            required
            value={form.address.country}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Pin Code"
            name="address.pin_code"
            fullWidth
            required
            value={form.address.pin_code}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Box mt={3}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Supplier"}
        </Button>
      </Box>
    </Paper>
  );
};

export default SupplierForm;
