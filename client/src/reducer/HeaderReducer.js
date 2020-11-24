import React, { useReducer } from 'react';

export const initState = {
  bannerOpen: false,
  searchOpen: false,
  accountOpen: false,
  bagOpen: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'BANNER_OPEN':
      return { bannerOpen: !state.bannerOpen };
    case 'SEARCH_OPEN':
      return { searchOpen: !state.searchOpen };
    case 'ACCOUNT_OPEN':
      return { accountOpen: !state.accountOpen };
    case 'BAG_OPEN':
      return { bagOpen: !state.bagOpen };
    default:
      return state;
  }
};
