import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";

const CartDrawer = (props) => {
  const { open, toggleCartDrawer } = props;
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartItemsArr = localStorage.getItem("CartDrawer");
    const parseCartItemsArr = JSON.parse(cartItemsArr);
    setCartItems(parseCartItemsArr || []);
  }, []);

  return (
    <div>
      <Drawer open={open} onClose={toggleCartDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleCartDrawer(false)}>
          <Typography variant="h5">Cart Items</Typography>
        </Box>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
