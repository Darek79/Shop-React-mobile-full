import React, { Fragment, useState, useContext, memo } from 'react';

import './hamburger.scss';
import { DispatchContext } from '../../../Context/context';

export const Hamburger = memo(({ bannerOpen }) => {
  const dispatch = useContext(DispatchContext);

  const chgClass = () => {
    dispatch({ type: 'BANNER_OPEN' });
  };

  return (
    <Fragment>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 257 149'
        onClick={chgClass}
        className={!bannerOpen ? 'hamburger5' : 'hamburger5moveAway'}>
        <line
          className='lin1'
          x1='2.5'
          y1='2.5'
          x2='254.5'
          y2='2.5'
          fill='none'
          stroke='#000'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='30'
          shapeRendering='crispEdges'
        />
        <line
          className='lin2'
          x1='2.5'
          y1='74.5'
          x2='254.5'
          y2='74.5'
          fill='none'
          stroke='#000'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='20'
          shapeRendering='crispEdges'
        />
        <line
          className='lin3'
          x1='2.5'
          y1='74.5'
          x2='254.5'
          y2='74.5'
          fill='none'
          stroke='#000'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='20'
          shapeRendering='crispEdges'
        />
        <line
          className='lin4'
          x1='2.5'
          y1='146.5'
          x2='254.5'
          y2='146.5'
          fill='none'
          stroke='#000'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='30'
          shapeRendering='crispEdges'
        />
      </svg>
    </Fragment>
  );
});
