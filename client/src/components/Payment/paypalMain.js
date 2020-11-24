import React, { useState, useEffect, createRef } from 'react';
import { connect } from 'react-redux';
import { PayPalBtn } from './PayPalBtn';
import { reduceToTotal, showBasket } from './../../redux/filters/filterHelpers';
import { Spinner } from './../Spinner/spinner';
import { useLocation } from 'react-router-dom';

export const PaymentComp = ({ total, basket, r,reset }) => {
  const [isLoaded, setLoad] = useState(false);
  const [checkScript, checkForScript] = useState(false);

  const location = useLocation();
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://www.paypal.com/sdk/js?client-id=AbeGrX4SqAnMxbZCt2yzm3-HLbD-16Byx_HQoV4Sz2KZNA1VyhsmsNOPlDsE9ByFA1N6lMSHT8ncobQX&currency=PLN';
    script.defer = true;
    script.id = 'paypal_script';
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(script);
    console.log(window.paypal, '--->PAYPAL LOADED?');
    checkForScript(() => true);
    window.onload = () => {
      if (window.paypal) {
        setLoad(() => true);
      }
    };
  }, [total, location.key]);

  useEffect(() => {
    let clearMe;
    if (checkScript) {
      clearMe = setTimeout(() => {
        setLoad(() => true);
      }, 1000);
    }
    return () => clearTimeout(clearMe);
  }, [checkScript]);

  return (
    <section className='paypal_module'>
      {isLoaded ? (
        <PayPalBtn total={total} basket={basket} r={r} reset={reset}/>
      ) : (
        <Spinner />
      )}
    </section>
  );
};
