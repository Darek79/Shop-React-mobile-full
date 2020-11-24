import React, { createRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { CheckoutForm } from './Stripe_Form';
const promise = loadStripe(
  'pk_test_51Ho7W9IGRT3hLQSoPswAcuAoFBz51uKm0RwyBLhjB3Wit3YUzFkR9mH1tUIn0sHeVpySFTsBNbcAVVV139vbdaI700ZLVCsmAr'
);

export const StripeMain = ({ total, currency,reset }) => {
  // const stripeRef = createRef();
  return (
    <section className='stripe_module'>
      <Elements stripe={promise}>
        <CheckoutForm total={total} currency={currency} reset={reset}/>
      </Elements>
    </section>
  );
};
