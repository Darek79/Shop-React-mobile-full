import React, { Fragment } from 'react';
import { ClosingXdefault } from './../ClosingX/ClosingXdefault';
import {v1} from 'uuid';

const qtyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const QualityList = ({ fn, fnVal, cl }) => (
  <section
    className='sizeList_wrapper'
    style={{ top: `${window.pageYOffset}px` }}>
    <ClosingXdefault fn={fn} cx='sizeList_closingX' />
    <h3>please choose a new quantity:</h3>
    <ul className={cl}>
      {qtyArray.map((el) => (
        <li value={el} key={v1()} onClick={(e) => fnVal(e)}>
          {el}
        </li>
      ))}
    </ul>
  </section>
);
