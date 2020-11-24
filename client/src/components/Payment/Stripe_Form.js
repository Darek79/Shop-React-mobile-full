import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Spinner } from './../../components/Spinner/spinner';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const cardStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#32325d',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

export const CheckoutForm = ({ total, currency, reset }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // axios({
    //   method:'POST',
    //   url:'create-stripe-payment-intent',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   data:{total,currency}

    // })
    window
      .fetch('http://localhost:3000/api/create-stripe-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ total, currency }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  useEffect(() => {
    if (succeeded) {
      history.push('/checkout/purchase-completed');
      reset();
    }
  }, [succeeded]);

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };
  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      {console.log(succeeded, 'STRIPE PAYMENT COM')}
      <CardElement
        id='card-element'
        options={cardStyle}
        onChange={handleChange}
      />
      <button disabled={processing || disabled || succeeded} id='submit'>
        <span id='button-text'>{processing ? <Spinner /> : 'Pay'}</span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className='card-error' role='alert'>
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {' '}
          Stripe dashboard.
        </a>{' '}
        Refresh the page to pay again.
      </p>
    </form>
  );
};
