import React from 'react';

const defaultStroke = { fill: 'none', stroke: '#231f20', strokeWidth: '2' };

export const Arrow = ({ idSvg, clSvg, clEl, strokeC }) => (
  <svg id={idSvg} className={clSvg} viewBox='0 0 24 24'>
    <polygon
      id={clEl}
      style={strokeC ? strokeC : defaultStroke}
      points='12,17.414 3.293,8.707 4.707,7.293 12,14.586 19.293,7.293 20.707,8.707'
    />
  </svg>
);
