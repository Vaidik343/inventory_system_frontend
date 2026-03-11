import React, { useEffect, useMemo } from 'react'
import {useSuppliers} from '../../context/SupplierContext';
import { CardContent,Grid, Card,CircularProgress, Typography } from '@mui/material';

const SupplierSummaryCard = () => {
    const {suppliers,getAllSuppliers} =  useSuppliers();

    useEffect( () => {
        getAllSuppliers();
    }, [])

    const summary = useMemo( () => {
        return suppliers.reduce(
            (acc) => {

                acc.totalSupplier += 1;

                return acc;

            },
             {
              totalSupplier: 0   
            }
        )
    }, [suppliers])


  return (
  <Grid container spacing={3}>
    {/* TOTAL SUPPLIERS */}
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          borderRadius: 3,
          background: "linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)",
          color: "white",
          boxShadow: "0 10px 30px rgba(33,150,243,0.3)",
          transition: "all .25s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 16px 40px rgba(33,150,243,0.4)",
          },
        }}
      >
        <CardContent>
          <Typography variant="overline" sx={{ opacity: 0.85 }}>
            Total Suppliers
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            {summary.totalSupplier}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

}

export default SupplierSummaryCard