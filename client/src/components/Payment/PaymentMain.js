import React, { useRef, useEffect, useState } from 'react';
import { PaymentComp } from './paypalMain';
import { StripeMain } from './Stripe';
import { reduceToTotal, showBasket } from './../../redux/filters/filterHelpers';
import { connect } from 'react-redux';
import paypalImg from './../../../public/img/paypal.png';
import stripeImg from './../../../public/img/stripe.png';

import './Payment.scss';
import { resetBasket } from '../../redux/actions/basketActions';

const PaymentMain = ({ total, basket, resetBasket }) => {
  const [showPaypal, setPaypal] = useState(false);
  const [showStripe, setStripe] = useState(false);
  const paypal = () => {
    setPaypal(() => true);
    if (showStripe) {
      setStripe(() => false);
    }
  };
  const stripe = () => {
    setStripe(() => true);
    if (showPaypal) {
      setPaypal(() => false);
    }
  };
  const resetPayment = () => {
    setPaypal(() => false);
    setStripe(() => false);
  };
  return (
    <section className='payment_main'>
      <div className='payment_paytxt'>{`total to pay: ${total}`}</div>
      <div className='payment_choose'>
        <p>choose checkout:</p>
      </div>
      <section className='payment_choose_method'>
        {!showPaypal ? (
          <img
            className={`${showStripe ? 'payment_hide' : 'payment_paypal_logo'}`}
            src={paypalImg}
            onClick={paypal}
          />
        ) : (
          <PaymentComp total={total} basket={basket} reset={resetBasket} />
        )}
        {!showStripe ? (
          <img
            className={`${showPaypal ? 'payment_hide' : 'payment_stripe_logo'}`}
            src={stripeImg}
            onClick={stripe}
          />
        ) : (
          <StripeMain
            total={total}
            basket={basket}
            currency='pln'
            reset={resetBasket}
          />
        )}
      </section>
      <div className='payment_reset' onClick={resetPayment}>
        reset payment method
      </div>
    </section>
  );
};
const storage = ({ basketReducer }) => ({
  total: reduceToTotal(basketReducer),
  basket: showBasket(basketReducer),
});

export default connect(storage, { resetBasket })(PaymentMain);
