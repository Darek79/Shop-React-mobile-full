import React, { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetBasket } from './../../redux/actions/basketActions';
import { v1 } from 'uuid';

export const PayPalBtn = ({ total, basket, reset }) => {
  const PayPalButton = paypal.Buttons.driver('react', { React, ReactDOM });
  const history = useHistory();
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total,
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then((d) => {
      if (d.status === 'COMPLETED') {
        history.push('/checkout/purchase-completed');
        reset();
      }
    });
  };
  return (
    <Fragment>
      <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </Fragment>
  );
};

// export default connect(null,{resetBasket})(PayPalBtn)
