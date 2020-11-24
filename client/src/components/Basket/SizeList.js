import React, { Fragment } from 'react';
import { ClosingXdefault } from './../ClosingX/ClosingXdefault';
import { v1 } from 'uuid';

const sizeArr = ['XS', 'S', 'M', 'L', 'XL'];

export const SizeList = ({ fn, fnVal,cl }) => (
  <section
    className='sizeList_wrapper'
    style={{ top: `${window.pageYOffset}px` }}>
    <ClosingXdefault fn={fn} cx='sizeList_closingX' />
    <h3>Please choose a new Size:</h3>
    <ul className={cl}>
      {sizeArr.map((el) => (
        <li onClick={(e) => fnVal(e)} key={v1()}>
          {el}
        </li>
      ))}
    </ul>
  </section>
);
