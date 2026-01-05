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
    <Grid container spacing={2}>
        <Grid item md={2}>
            <Card
  sx={{
    minHeight: '10dvh',
    borderRadius: 4,
    // boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    p: 1,
  }}
>

                <CardContent>
                    <Typography>
                        Total Supplier
                    </Typography>
                    <Typography>
                            {summary.totalSupplier}
                        </Typography>
                </CardContent>
            </Card>

        </Grid>

    </Grid>
  )
}

export default SupplierSummaryCard