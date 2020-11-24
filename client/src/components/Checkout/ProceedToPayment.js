import React from 'react';

import GoToCheckout from './../Button/LinkButton';

export const ProceedToPayment = () => (
  <GoToCheckout
    linkC='basket_checkout_wrapper'
    btnC='basket_checkout_btn'
    path='/checkout/payment'
    txt='Proceed To Payment'
  />
);
