import { Box, CircularProgress, Grid, Typography, Button, Rating, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const ProductDetails = () => {
  const [ProductDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogImage, setDialogImage] = useState('');
  const param = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${param?.product_id}`);
        if (response.status === 200) {
          setProductDetails(response.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [param?.productId]);

  const handleImageClick = (image) => {
    setDialogImage(image);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {isLoading ? (
        <Box className="text-center mt-5">
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Box sx={{
          backgroundImage: 'url(your-background-image-url.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: { xs: '1rem', sm: '3rem' },
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
          <Grid container spacing={4} sx={{ width: '100%', maxWidth: '1200px' }}>
            <Grid item xs={12} sm={6} className="text-center">
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'all 0.4s ease-in-out',
                '&:hover .product-image': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                  opacity: '0.85',
                },
              }}>
                <img
                  className="product-image"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: 'auto',
                    maxWidth: '380px',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    transition: 'transform 0.4s ease, box-shadow 0.4s ease, opacity 0.4s ease',
                  }}
                  src={ProductDetails.image}
                  alt={ProductDetails.title}
                  onClick={() => handleImageClick(ProductDetails.image)}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} sx={{
              padding: { xs: '1rem', sm: '2.5rem' },
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
              position: 'relative',
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#2A9D8F', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Category:
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '1rem', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: '500' }}>
                {ProductDetails.category}
              </Typography>

              <Typography variant="h4" sx={{ fontWeight: '700', marginBottom: '1.5rem', fontSize: { xs: '1.8rem', sm: '2.5rem' }, lineHeight: '1.4', color: '#333', textTransform: 'capitalize', letterSpacing: '1px' }}>
                {ProductDetails.title}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating value={ProductDetails.rating?.rate || 0} readOnly sx={{ marginRight: '1rem', color: '#FFC107', transition: 'color 0.3s ease-in-out', '&:hover': { color: '#FFB300' } }} />
                  <Typography variant="body2" color="textSecondary">
                    {ProductDetails.rating?.count} reviews
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: '700', fontSize: '2rem', color: '#E76F51', textTransform: 'uppercase', textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)', paddingLeft: '15px' }}>
                  ${ProductDetails.price}
                </Typography>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1rem', color: '#2A9D8F', letterSpacing: '1px' }}>
                Product Description:
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '2rem', fontSize: '1.1rem', letterSpacing: '0.5px', lineHeight: '1.6', textAlign: 'justify', padding: '0 20px' }}>
                {ProductDetails.description}
              </Typography>
            </Grid>
          </Grid>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Product Image</DialogTitle>
            <DialogContent>
              <img src={dialogImage} alt="Enlarged Product" style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain' }} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </>
  );
};

export default ProductDetails;