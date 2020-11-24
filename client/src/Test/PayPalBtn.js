import React, { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import hoc from './paypalMain';

const PayPalBtn = ({ total }) => {
  const PayPalButton = paypal.Buttons.driver('react', { React, ReactDOM });
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: '0.01',
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture();
  };
  return (
    <Fragment>
      <h2>{total}</h2>
      <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </Fragment>
  );
};

export default hoc(PayPalBtn);
