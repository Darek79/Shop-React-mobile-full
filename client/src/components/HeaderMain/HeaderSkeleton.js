import React from 'react';

import './headerSkeleton.scss';


export default ({bm,bi})=>(
  <div className='sheaderMain' style={{backgroundColor:bm}}>
    <div className='shamburger5' style={{backgroundColor:bi}}/>
    <div className='sactionButtons'>
      <div className='sactionItems' style={{backgroundColor:bi}} />
      <div className='sactionItems' style={{backgroundColor:bi}} />
      <div className='sactionItems' style={{backgroundColor:bi}} />
    </div>

  </div>
)