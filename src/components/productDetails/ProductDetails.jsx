import { Box, CircularProgress, Grid, Typography, Button, Rating, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogImage, setDialogImage] = useState('');
  const param = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
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
    fetchProduct();
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
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" p={3} mt={5}>
          <Grid container spacing={3} sx={{ maxWidth: '800px', boxShadow: 3, borderRadius: 2, padding: 2, backgroundColor: 'white' }}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" justifyContent="center">
                <img
                  src={productDetails.image}
                  alt={productDetails.title}
                  style={{
                    width: '100%',
                    maxWidth: '300px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleImageClick(productDetails.image)}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {productDetails.category}
              </Typography>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {productDetails.title}
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <Rating value={productDetails.rating?.rate || 0} readOnly />
                <Typography variant="body2" color="textSecondary" ml={1}>
                  {productDetails.rating?.count} reviews
                </Typography>
              </Box>
              <Typography variant="h6" color="primary" mb={2}>
                ${productDetails.price}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {productDetails.description}
              </Typography>
              <Box className=" d-flex gap-5 mt-3 ">
                <Button variant="outlined"><FavoriteBorderIcon /></Button>
                <Button variant="outlined"><AddShoppingCartIcon /></Button>
                <Button variant="outlined"><ShareIcon /></Button>
              </Box>
             
            </Grid>
          </Grid>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Product Image</DialogTitle>
            <DialogContent>
              <img src={dialogImage} alt="Enlarged Product" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
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
