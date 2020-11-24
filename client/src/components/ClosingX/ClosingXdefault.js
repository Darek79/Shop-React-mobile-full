import React from 'react';

import './closingX.scss';

export const ClosingXdefault = ({ fn,l1,l2,cx }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24.75 24.81'
    onClick={fn}
    className={cx}>
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
