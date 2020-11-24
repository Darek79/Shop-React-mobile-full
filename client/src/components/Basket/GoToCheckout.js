import React from 'react';

import GoToCheckout from './../Button/LinkButton';

export const MoveToCheckout = () => (
  <GoToCheckout
    linkC='basket_checkout_wrapper'
    btnC='basket_checkout_btn'
    path='/checkout'
    txt='Go to Checkout'
  />
);
