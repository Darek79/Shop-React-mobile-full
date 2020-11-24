import React, { useContext } from 'react';
import { DispatchContext } from '../../Context/context';

import './closingX.scss';

export const ClosingX = ({ action, l1 = 'xline1', l2 = 'xline2' }) => {
  const dispatch = useContext(DispatchContext);

  const closeBanner = () => {
    dispatch({ type: action });
  };
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24.75 24.81'
      onClick={closeBanner}
      className='bannerX'>
      <line
        x1='2.5'
        y1='2.5'
        x2='22.25'
        y2='22.31'
        fill='none'
        stroke='#231f20'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='3'
        className={l1}
      />
      <line
        x1='2.5'
        y1='22.31'
        x2='22.25'
        y2='2.5'
        fill='none'
        stroke='#231f20'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='3'
        className={l2}
      />
    </svg>
  );
};
