import React from 'react';

export const Dot = ({
  dotKey,
  fnShowImg,
  index,
  fnStop,
  effectClass1,
  effectClass2,
  clickedEffect1,
  clickedEffect2,
}) => (
  <svg
    className='circleWrapper'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 21.69 21.69'
    key={dotKey + 100}
    onClick={(e) => fnShowImg(e)}
    onMouseOver={fnStop}
    data-index={index}>
    <circle
      cx='10.84'
      cy='10.84'
      r='3'
      fill='none'
      stroke='#fcfcfc'
      strokeMiterlimit='10'
      strokeWidth='3'
      className={`${effectClass1 ? effectClass1 : 'circle1'}`}
      data-index={index}
    />
    <circle
      cx='10.84'
      cy='10.84'
      r='3'
      fill='none'
      stroke='#fcfcfc'
      strokeMiterlimit='10'
      strokeWidth='3'
      className={`${effectClass2 ? effectClass2 : 'circle2'}`}
      data-index={index}
    />
  </svg>
);
