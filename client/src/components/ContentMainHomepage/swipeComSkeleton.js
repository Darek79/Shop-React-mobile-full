import React from 'react';

import './swipeComSkeleton.scss';

export default () => (
  <div className='swipeSkeletonWrapper'>
    <div className='swipeSkeletonOuter'>
      <div className='swipeSkeletonOuterImg'></div>
      <div className='swipeSkeletonInner'>
        <div className='swipeSkeletonInnerItems'></div>
        <div className='swipeSkeletonInnerItems'></div>
        <div className='swipeSkeletonInnerItems'></div>
      </div>
    </div>
    <div className='swipeSkeletonOuter'>
      <div className='swipeSkeletonOuterImg'></div>
      <div className='swipeSkeletonInner'>
        <div className='swipeSkeletonInnerItems'></div>
        <div className='swipeSkeletonInnerItems'></div>
        <div className='swipeSkeletonInnerItems'></div>
      </div>
    </div>
  </div>
);
