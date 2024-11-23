import { Button, ButtonGroup, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decreaseQuantity, increaseQuantity } from "../slice/products/productSlice";
const CartDrawer = (props) => {
  const { open, toggleCartDrawer } = props;
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.product)
  console.log(items, 'items');
  return (
    <div>
      <Drawer open={open} onClose={toggleCartDrawer(false)}>
        <Box sx={{ width: 450 }} role="presentation"
        >
          <Typography  variant="h5" className="mb-5 text-center mt-3 border-bottom pb-3">Cart Items</Typography>
          {items?.map((item) => {
            return (
              <Box className="d-flex justify-content-between align-items-center mt-4 border-bottom pb-4 mx-3">
                <div>
                  <img width="40px" src={item?.image} alt="" />
                  <span> {item?.title?.length >= 15
                    ? `${item?.title.slice(0, 15)}...`
                    : item?.title}</span>
                </div>
                <ButtonGroup className="border" size="25" variant="text" aria-label="Basic button group">
                  <Button ><RemoveIcon sx={{ width: 15 }} onClick={() => dispatch(decreaseQuantity(item))} /></Button>
                  <Button>{item?.quantity}</Button>
                  <Button><AddIcon sx={{ width: 15 }} onClick={() => dispatch(increaseQuantity(item))} /></Button>
                </ButtonGroup>
                <span className="fw-bold">{item?.price}</span>
              </Box>
            );
          })}
        </Box>
      </Drawer>
    </div>
  );
};
export default CartDrawer;       