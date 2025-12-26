import React, { useState } from 'react'
import { useSettings } from '../../context/SettingsContext'
import { Button, Paper, TableContainer, Grid,Box, TextField, Typography } from '@mui/material';

const settingForm = {
     companyName:"",
        invoice_prefix:"",
        tax_rates:"",
        currency:"",
          address: {
    street: "",
    city: "",
    country: "",
    pin_code: "",
  },
}

const SettingForm = () => {

    const {createSetting, loading } = useSettings();

    const [form,setForm] = useState(settingForm);

    const handleChange = async(e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    const handleAddressChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, address: {
            ...form.address,[name]:value,
        }})
    }
    const handleSubmit = async() => {
        try {
        await createSetting(form)
        setForm(settingForm);            
        } catch (error) {
            console.log("error in submitting data!");
        }
    }


  return (
    <Paper>
    <Typography variant='h6' gutterBottom>Create settings</Typography>
    <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
            <TextField
              label="Company name"
              name='companyName'
              type='text'
              value={form.companyName}
              onChange={handleChange}
            />
            <TextField
              label="Invoice Prefix"
              name='invoice_prefix'
              type='text'
              value={form.invoice_prefix}
              onChange={handleChange}
            />
            <TextField
              label="Tax Rates"
              name='tax_rates'
              type='text'
              value={form.tax_rates}
              onChange={handleChange}
            />
            <TextField
              label="Currency"
              name='currency'
              type='text'
              value={form.currency}
              onChange={handleChange}
            />
            <TextField
              label="Street"
              name='street'
              type='text'
              value={form.address.street}
              onChange={handleAddressChange}
            />
            <TextField
              label="City"
              name='city'
              type='text'
              value={form.address.city}
              onChange={handleAddressChange}
            />
            <TextField
              label="Country"
              name='country'
              type='text'
              value={form.address.country}
              onChange={handleAddressChange}
            />
            <TextField
              label="Pin code"
              name='pin_code'
              type='number'
              value={form.address.pin_code}
              onChange={handleAddressChange}
            />

        </Grid>
    </Grid>

    <Box mt={3}>
        <Button variant='contained' onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Settings"}
        </Button>
    </Box>

    </Paper>
  )
}

export default SettingForm  