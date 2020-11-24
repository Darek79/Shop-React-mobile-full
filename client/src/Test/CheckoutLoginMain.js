import React, { Fragment } from 'react';
import Login from './Checkout';
import CreateAccount from './Checkout';
import Guest from './Checkout';

export const CheckoutLoginMain = () => (
  <Fragment>
    <Login
      path='signin/login'
      isLogin={true}
      createAcc={false}
      descTxt='Login to Account'
      submitBtn='Login'
    />
    <CreateAccount
      descTxt='Create a Account'
      submitBtn='Proceed'
      passConfirm={true}
      isLogin={true}
      createAcc={true}
      path='signin/signup'
    />
    <Guest
      path='signin/signup'
      isLogin={false}
      isGuest={true}
      descTxt='Proceed as Guest'
      submitBtn='Proceed'
    />
  </Fragment>
);
