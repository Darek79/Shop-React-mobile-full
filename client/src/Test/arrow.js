import React from 'react';

export const Arrow = ({ idSvg,clSvg, clEl }) => (
  <svg version='1.1' id={clSvg} className={clSvg} viewBox='0 0 24 24'>
    <polygon
      id={clEl}
      style={{ fill: 'none', stroke: '#231f20', strokeWidth: '2' }}
      points='12,17.414 3.293,8.707 4.707,7.293 12,14.586 19.293,7.293 20.707,8.707'
    />
  </svg>
);
