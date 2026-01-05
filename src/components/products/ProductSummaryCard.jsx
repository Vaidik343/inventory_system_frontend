import React,{useEffect, useMemo, useState} from 'react'
import {useProduct} from '../../context/ProductContext'
import { CardContent, Grid, Card, CircularProgress, Typography } from '@mui/material';


const styleCard = ()=> ({
   minHeight: '10dvh',
    borderRadius: 4,
    // boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    p: 1,
})
const ProductSummaryCard = () => {

  const {products,loading, getAllProducts } = useProduct();
  console.log("🚀 ~ ProductSummaryCard ~ products:", products)
  
  useEffect( ()=> {
     getAllProducts();
  }, [])
  const summary = useMemo( () => {
    return products.reduce(
      (acc, product) => {

        acc.totalProduct +=1;
        acc.totalCost += product.cost * product.stock_qty;
        acc.totalSell += product.sell_price * product.stock_qty;
        acc.totalStock += product.stock_qty

        return acc

      },
       {
        totalProduct: 0,
        totalCost: 0,
        totalSell: 0,
        totalStock: 0,
      }
    )

  }, [products])

  if(loading) return <CircularProgress />
  return (
    <Grid container spacing={2}>

      {/* Total product */}
      <Grid item xs={12} sm={6} md={5}>
        <Card  sx={styleCard}>
          <CardContent>
            <Typography variant='subtitle2' color='text.secondary'>
              Total Product 
            </Typography>
            <Typography variant='h5'>
              {summary.totalProduct}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Total cost */}
      <Grid item xs={12} sm={6} md={3} >
        <Card sx={styleCard}>
          <CardContent>
            <Typography variant='subtitle2' color='text.secondary'>
              Total Cost 
              <Typography variant='h5'>
                {summary.totalCost}

              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Total sell */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={styleCard}>
          <CardContent>
            <Typography variant='subtitle2' color='text.secondary'>
              Total Sell 
            </Typography>
            <Typography variant='h5'>
              {summary.totalSell}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Total Stock */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={styleCard}>
          <CardContent>
            <Typography variant='subtitle2' color='text.secondary'>Total Stock</Typography>
            <Typography>
              {summary.totalStock}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}

export default ProductSummaryCard