import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Image } from '../Img/Img';
import CardButton from './../Button/LinkButton';
import { ClosingXdefault } from '../ClosingX/ClosingXdefault';
import { connect } from 'react-redux';
import { added } from './../../redux/actions/basketActions';
import { NavLink } from './../Button/Button';
//import Image import BTN import closingX

import './checkoutCard.scss';

const CheckoutCard = ({ basket, basketAction, added }) => {
  const item = basket[basket.length - 1];
  useEffect(() => {
    let clear;
    if (basketAction.show) {
      // setShowCard(true);
      clear = setTimeout(() => added({ show: false }), 2500);
    }
    return () => clearTimeout(clear);
  }, [basket]);
  const removeBanner = () => {
    added({ show: false });
  };
  return (
    <Fragment>
      {basketAction.show ? (
        <section className={`pdp_added`}>
          {console.log(item && item, 'i')}
          <div className='card_headWrapper'>
            <h3 id='card_msg'>The item was added to the cart</h3>
            <ClosingXdefault cx='card_clX' fn={removeBanner} />
          </div>
          <div className='card_maindesc_wrapper'>
            <Image
              c='card_img'
              s={item && item.photo}
              small={item && item.photo}
              medium={item && item.photo}
              big={item && item.photo}
              a='card_img'
            />
            <div className='card_dscWrapper'>
              <p className='card_dsc'>{item && item.title}</p>
              <p className='card_dsc'>{item && item.desc}</p>
              <p className='card_dsc'>size {item && item.size}</p>
              <p className='card_dsc'>{item && item.price}</p>
            </div>
          </div>
          <div className='card_btnWrapper'>
            <CardButton
              btnC='card_btn1'
              txt={`go to basket ${
                basket.length < 9 ? '(' + basket.length + ')' : '9+'
              }`}
              linkC='card_btn1_wrapper'
              path='/cart'
            />

            <CardButton
              btnC='card_btn2'
              txt='checkout'
              linkC='card_btn1_wrapper'
              path='/checkout'
            />
          </div>
        </section>
      ) : undefined}
    </Fragment>
  );
};

const storage = ({ basketReducer, basketActionReducer }) => ({
  basket: basketReducer,
  basketAction: basketActionReducer,
});

export default connect(storage, { added })(CheckoutCard);
