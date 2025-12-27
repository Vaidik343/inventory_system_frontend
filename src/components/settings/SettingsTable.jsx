import React, { useEffect } from 'react'
import { useSettings } from '../../context/SettingsContext'
import { TableCell, TableContainer, TableBody,TableRow, TableHead } from '@mui/material';

const SettingsTable = () => {
  const {settings, getAllSettings, loading} = useSettings();

  useEffect(()=> {
    getAllSettings();
  }, [])
  return (
    <TableContainer>
        <TableHead>
          <TableCell>
            company Name
          </TableCell>
          <TableCell>Invoice Prefix</TableCell>
          <TableCell>Tax Rates</TableCell>
          <TableCell>Currency</TableCell>
          <TableCell>Address</TableCell>
        </TableHead>
        <TableBody>
          {settings.map((set) => (
            <TableRow key={set._id}>
            <TableCell>{set.companyName}</TableCell>
            <TableCell>{set.invoice_prefix}</TableCell>
            <TableCell>{set.tax_rates}</TableCell>
            <TableCell>{set.currency}</TableCell>
            <TableCell>{set.address ? `${set.address.street}, ${set.address.city}, ${set.address.country}, ${set.address.pin_code}` :"-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
    </TableContainer>
        
  
  )
}

export default SettingsTable