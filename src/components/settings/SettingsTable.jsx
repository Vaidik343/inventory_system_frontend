import React, { useEffect } from 'react'
import { useSettings } from '../../context/SettingsContext'
import { Table, TableCell, TableContainer, TableBody, TableRow, TableHead, Paper } from '@mui/material';

const SettingsTable = () => {
  const { settings, getAllSettings, loading } = useSettings();

  useEffect(() => {
    getAllSettings();
  }, [])
  return (
    <TableContainer
      component={Paper}
      sx={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        elevation: 0
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ background: 'rgba(255, 255, 255, 0.05)' }}>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Company Name</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Invoice Prefix</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Tax Rates</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Currency</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Address</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {settings.map((set) => (
            <TableRow
              key={set._id}
              hover
              sx={{
                '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
                transition: 'all 0.3s ease'
              }}
            >
              <TableCell>{set.companyName}</TableCell>
              <TableCell>{set.invoice_prefix}</TableCell>
              <TableCell>{set.tax_rates}</TableCell>
              <TableCell>{set.currency}</TableCell>
              <TableCell>{set.address ? `${set.address.street}, ${set.address.city}, ${set.address.country}, ${set.address.pin_code}` : "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


  )
}

export default SettingsTable