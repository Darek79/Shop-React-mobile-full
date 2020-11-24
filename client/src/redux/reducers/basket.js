import {
  ADDTOCART,
  REMOVEFROMCART,
  ADDED,
  CHGQUANTITY,
  CHGSIZE,
  RESET_BASKET,
  VERIFIED_BASKET,
} from '../actionVars';
const basket = [];
const card = { show: false };

export const basketReducer = (state = basket, action) => {
  switch (action.type) {
    case ADDTOCART:
      return [...state, action.item];
    case REMOVEFROMCART:
      return state.filter((el) => {
        if (el.id !== action.id && el.size !== action.size) {
          return el;
        }
      });
    case CHGQUANTITY:
      return state.map((el) => {
        if (el.id === action.id && el.size === action.size) {
          el.qty = action.qty;
          el.val = el.price * el.qty;
          return el;
        } else {
          return el;
        }
      });
    case CHGSIZE:
      return state.map((el) => {
        console.log(el.id === action.id, el.size === action.orgSizel, 'remove');
        if (el.id === action.id && el.size === action.orgSize) {
          el.size = action.size;
          el.price = el.price;
          return el;
        } else {
          return el;
        }
      });
    case VERIFIED_BASKET:
      return [...action.verified];
    case RESET_BASKET:
      return [];
    default:
      return state;
  }
};

export const basketActionReducer = (state = card, action) => {
  switch (action.type) {
    case ADDED:
      return { show: action.show };
    default:
      return state;
  }
};

// CHGQUANTITY
// CHGSIZE
// (el) => el.id !== action.id && el.size !== action.size
