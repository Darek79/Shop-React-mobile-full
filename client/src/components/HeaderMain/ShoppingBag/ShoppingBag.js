import React, { memo, useContext, Fragment, useEffect } from 'react';
import { DispatchContext } from '../../../Context/context';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { showBasket } from './../../../redux/filters/filterHelpers';
// import { CheckoutCard } from './../../CheckoutCard/CheckoutCard';

import './ShoppingBag.scss';

const ShoppingBag = memo(({ basket }) => {
  const dispatch = useContext(DispatchContext);
  const bagOpen = () => {
    dispatch({ type: 'BAG_OPEN' });
  };
  return (
    <Fragment>
      <NavLink
        to={{
          pathname: '/cart',
          state: { refferer: window.location.pathname },
        }}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          onClick={bagOpen}
          id='shoppingBag'>
          <path
            className='shoppingBagPath'
            d='M16,7V5c0-1.654-1.346-3-3-3h-2C9.346,2,8,3.346,8,5v2H4v14h16V7H16z M10,5c0-0.551,0.448-1,1-1h2c0.552,0,1,0.449,1,1v2h-4
  V5z M18,19H6V9h2v3h2V9h4v3h2V9h2V19z'
          />
        </svg>
        <div onClick={bagOpen} className='basketTootltip'>
          {basket.length < 10 ? basket.length : '9+'}
        </div>
      </NavLink>
    </Fragment>
  );
});

const storage = ({ basketReducer }) => ({
  basket: basketReducer,
});
export default connect(storage, null)(ShoppingBag);

//{console.log(basket[basket.length - 1])}
