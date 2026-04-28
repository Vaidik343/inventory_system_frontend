import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem,
  Typography,
  Divider,
  IconButton,
  Fade,
  Backdrop
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ImageIcon from '@mui/icons-material/Image';
import { useProduct } from "../../context/ProductContext";
import { useCategory } from "../../context/CategoryContext";
import { useSuppliers } from './../../context/SupplierContext';

export default function ProductCreate() {

   useEffect(() => {
  getAllCategories();
  getAllSuppliers();
}, []);
  const { createProducts } = useProduct();
const { categories, getAllCategories } = useCategory();
const { suppliers, getAllSuppliers } = useSuppliers();

 
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    description: "",
    categoryId: "",
    supplierId: "",
    unit: "",
    cost: "",
    sell_price: "",
    tax_rate: "",
    stock_qty: "",
    image:null
  });

const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (files) {
    setForm((prev) => ({
      ...prev,
      [name]: files[0],
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
    setLoading(true);

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("sku", form.sku);
    formData.append("description", form.description);
    formData.append("categoryId", form.categoryId);
    formData.append("supplierId", form.supplierId);
    formData.append("unit", form.unit);
    formData.append("cost", Number(form.cost));
    formData.append("sell_price", Number(form.sell_price));
    formData.append("tax_rate", Number(form.tax_rate));
    formData.append("stock_qty", Number(form.stock_qty));

    if (form.image) {
      formData.append("image", form.image);
    }

    const proCrt = await createProducts(formData);

    console.log("Created product:", proCrt);

    setOpen(false);
  } catch (err) {
    console.error("Create product failed", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <Box mb={2}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: '#ec4899',
          borderRadius: '12px',
          py: 1.2,
          px: 3,
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '15px',
          color: 'white',
          boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)',
          '&:hover': {
            backgroundColor: '#db2777',
            boxShadow: '0 6px 20px rgba(240, 147, 251, 0.4)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        Add Product
      </Button>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        fullWidth 
        maxWidth="md"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(15, 23, 42, 0.4)',
            }
          }
        }}
        PaperProps={{
          sx: {
            borderRadius: '24px',
            boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }
        }}
      >
        <DialogTitle sx={{ 
          p: 4, 
          pb: 2,
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          position: 'relative',
        }}>
          <Box>
            <Typography variant="h5" sx={{ 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              Create Product
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5, fontWeight: 500 }}>
              Add a new product to your inventory system
            </Typography>
          </Box>
          <IconButton 
            onClick={() => setOpen(false)} 
            sx={{ 
              backgroundColor: '#f1f5f9',
              color: '#64748b',
              '&:hover': { backgroundColor: '#e2e8f0', color: '#0f172a', transform: 'rotate(90deg)' },
              transition: 'all 0.3s ease'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ px: 4, py: 2, overflowX: 'hidden' }}>
          <Box sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              transition: 'all 0.3s ease',
              '& fieldset': { borderColor: '#e2e8f0', borderWidth: '1.5px' },
              '&:hover fieldset': { borderColor: '#cbd5e1' },
              '&.Mui-focused fieldset': { borderColor: '#8b5cf6', borderWidth: '2px' },
              '&.Mui-focused': { boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)' }
            },
            '& .MuiInputLabel-root': { fontWeight: 500, color: '#64748b', '&.Mui-focused': { color: '#8b5cf6' } }
          }}>
            
            {/* Basic Information Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, mt: 1 }}>
              <Box sx={{ p: 1, borderRadius: '10px', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)', color: '#ec4899', display: 'flex' }}>
                <InfoIcon fontSize="small" />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>Basic Information</Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField label="Product Name" name="name" fullWidth required value={form.name} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="SKU" name="sku" fullWidth required value={form.sku} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Description" name="description" fullWidth multiline rows={2} value={form.description} onChange={handleChange} />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4, borderColor: '#f1f5f9' }} />

            {/* Classification Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box sx={{ p: 1, borderRadius: '10px', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)', color: '#8b5cf6', display: 'flex' }}>
                <CategoryIcon fontSize="small" />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>Classification</Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField select label="Category" name="categoryId" fullWidth value={form.categoryId} onChange={handleChange}>
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id} sx={{ borderRadius: '8px', mx: 1 }}>{cat.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField select label="Supplier" name="supplierId" fullWidth value={form.supplierId} onChange={handleChange}>
                  {suppliers.map((sup) => (
                    <MenuItem key={sup._id} value={sup._id} sx={{ borderRadius: '8px', mx: 1 }}>{sup.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField select label="Unit" name="unit" fullWidth value={form.unit} onChange={handleChange}>
                  <MenuItem value="pcs" sx={{ borderRadius: '8px', mx: 1 }}>Pieces</MenuItem>
                  <MenuItem value="kg" sx={{ borderRadius: '8px', mx: 1 }}>Kilogram</MenuItem>
                  <MenuItem value="ltr" sx={{ borderRadius: '8px', mx: 1 }}>Liter</MenuItem>
                  <MenuItem value="box" sx={{ borderRadius: '8px', mx: 1 }}>Box</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4, borderColor: '#f1f5f9' }} />

            {/* Pricing Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box sx={{ p: 1, borderRadius: '10px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)', color: '#10b981', display: 'flex' }}>
                <AttachMoneyIcon fontSize="small" />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>Pricing & Inventory</Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <TextField label="Cost Price" name="cost" type="number" fullWidth value={form.cost} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Selling Price" name="sell_price" type="number" fullWidth value={form.sell_price} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Tax Rate (%)" name="tax_rate" type="number" fullWidth value={form.tax_rate} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Opening Stock" name="stock_qty" type="number" fullWidth value={form.stock_qty} onChange={handleChange} />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4, borderColor: '#f1f5f9' }} />

            {/* Product Image Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box sx={{ p: 1, borderRadius: '10px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)', color: '#f59e0b', display: 'flex' }}>
                <ImageIcon fontSize="small" />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>Product Image</Typography>
            </Box>
            
            <Box 
              component="label"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                border: '2px dashed',
                borderColor: form.image ? '#10b981' : '#cbd5e1',
                borderRadius: '16px',
                backgroundColor: form.image ? 'rgba(16, 185, 129, 0.05)' : '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#8b5cf6',
                  backgroundColor: 'rgba(139, 92, 246, 0.02)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <input type="file" name="image" hidden onChange={handleChange} accept="image/*" />
              
              {form.image ? (
                <>
                  <CloudUploadIcon sx={{ fontSize: 48, color: '#10b981', mb: 2 }} />
                  <Typography sx={{ color: '#10b981', fontWeight: 600, fontSize: '1.1rem' }}>
                    {form.image.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#10b981', opacity: 0.8, mt: 0.5 }}>
                    Click to replace image
                  </Typography>
                </>
              ) : (
                <>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: '50%', 
                    backgroundColor: '#f8fafc', 
                    mb: 2,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.05)' 
                  }}>
                    <CloudUploadIcon sx={{ fontSize: 32, color: '#94a3b8' }} />
                  </Box>
                  <Typography sx={{ color: '#475569', fontWeight: 600, fontSize: '1.1rem' }}>
                    Click to upload image
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5 }}>
                    SVG, PNG, JPG or GIF (max. 5MB)
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 4, pt: 3, backgroundColor: '#f8fafc', borderTop: '1px solid rgba(0,0,0,0.03)' }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: '12px',
              color: '#64748b',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '15px',
              '&:hover': { backgroundColor: '#f1f5f9', color: '#0f172a' },
              transition: 'all 0.2s'
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: '12px',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '15px',
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              boxShadow: '0 8px 20px rgba(236, 72, 153, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #db2777 0%, #7c3aed 100%)',
                boxShadow: '0 10px 25px rgba(236, 72, 153, 0.4)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
