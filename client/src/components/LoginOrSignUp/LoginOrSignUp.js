import React, { Fragment } from 'react';
import LoginMain from './../Checkout/Checkout';
import CreateAccountMain from './../Checkout/Checkout';

import './LoginOrSignUp.scss';

export default () => (
  <Fragment>
    <section className='signup_desc_wrapper1'>
      <p>Customer Login</p>
    </section>
    <LoginMain
      path='signin/login'
      isLogin={true}
      createAcc={false}
      descTxt='Login to Account'
      submitBtn='Login'
      shouldBeOpen={true}
    />
    <section className='signup_desc_wrapper2'>
      <p>Create an account</p>
      <p>Enjoy easy access to your order history and faster shopping!</p>
    </section>
    <CreateAccountMain
      descTxt='Create a Account'
      submitBtn='Proceed'
      passConfirm={true}
      isLogin={true}
      createAcc={true}
      shouldBeOpen={true}
      path='signin/signup'
    />
  </Fragment>
);
