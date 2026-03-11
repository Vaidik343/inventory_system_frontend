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
  <Grid container spacing={3}>
    {/* TOTAL PRODUCTS */}
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          transition: "all .25s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
          },
        }}
      >
        <CardContent>
          <Typography variant="overline" color="text.secondary">
            Total Products
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            {summary.totalProduct}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    {/* TOTAL COST */}
<Grid item xs={12} sm={6} md={3}>
  <Card
    sx={{
      borderRadius: 3,
      background: "linear-gradient(135deg, #26a69a 0%, #80cbc4 100%)", // teal gradient
      color: "white",
      boxShadow: "0 10px 30px rgba(38,166,154,0.35)",
      transition: "all .25s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 16px 40px rgba(38,166,154,0.4)",
      },
    }}
  >
    <CardContent>
      <Typography variant="overline" sx={{ opacity: 0.85 }}>
        Inventory Cost
      </Typography>
      <Typography variant="h5" fontWeight={700}>
        ₹{summary.totalCost.toLocaleString()}
      </Typography>
    </CardContent>
  </Card>
</Grid>


    {/* TOTAL SELL */}
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          borderRadius: 3,
          background:
            "linear-gradient(135deg, #4caf50 0%, #81c784 100%)",
          color: "white",
          boxShadow: "0 10px 30px rgba(76,175,80,0.35)",
        }}
      >
        <CardContent>
          <Typography variant="overline" sx={{ opacity: 0.85 }}>
            Potential Revenue
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            ₹{summary.totalSell.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    {/* TOTAL STOCK */}
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          borderRadius: 3,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CardContent>
          <Typography variant="overline" color="text.secondary">
            Total Stock
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            {summary.totalStock}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

}

export default ProductSummaryCard