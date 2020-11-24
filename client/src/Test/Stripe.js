import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { connect } from 'react-redux';
const promise = loadStripe(
  'pk_test_51Ho7W9IGRT3hLQSoPswAcuAoFBz51uKm0RwyBLhjB3Wit3YUzFkR9mH1tUIn0sHeVpySFTsBNbcAVVV139vbdaI700ZLVCsmAr'
);

const StripeMain=() => {
  return (
    <section className='stripe_module'>
      <Elements stripe={promise}>//</Elements>
    </section>
  );
};



export default connect()(StripeMain);