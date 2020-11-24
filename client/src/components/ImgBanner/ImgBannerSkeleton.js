import React from 'react';

import './imgBannerSkeleton.scss';

export default ({ h }) => (
  <div className='imgBannerSkeletonWrapper' style={{ height: h }}>
    <div className='imgBannerSkeletonInside'>
      <div className='imgBannerSkeletonInsideDot' />
      <div className='imgBannerSkeletonInsideDot' />
      <div className='imgBannerSkeletonInsideDot' />
    </div>
  </div>
);
