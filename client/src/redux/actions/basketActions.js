import {
  ADDTOCART,
  REMOVEFROMCART,
  ADDED,
  CHGQUANTITY,
  CHGSIZE,
  RESET_BASKET,
  VERIFIED_BASKET,
} from './../actionVars';
import axios from 'axios';

export const addItemToCart = (item = {}) => ({
  type: ADDTOCART,
  item,
});

export const removeItemFromCart = (id = '', orgSize = '') => ({
  type: REMOVEFROMCART,
  id,
  orgSize,
});

export const added = ({ show }) => ({
  type: ADDED,
  show,
});

export const chgItemQty = (qty = 0, size = '', id) => ({
  type: CHGQUANTITY,
  size,
  id,
  qty,
});
export const chgItemSize = (orgSize, size = '', id) => ({
  type: CHGSIZE,
  orgSize,
  size,
  id,
});
export const resetBasket = () => ({
  type: RESET_BASKET,
});
export const verifyTheBakset = (verified = []) => ({
  type: VERIFIED_BASKET,
  verified,
});
export const postToEndpoint = (path, payload = [], fn) => {
  return async () => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `http://localhost:3000/${path}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: payload,
      });
      console.log(data, '---ACTION---');
      fn(data);
    } catch (error) {
      if (error) {
        console.log(error, 'error');
      }
    }
  };
};
