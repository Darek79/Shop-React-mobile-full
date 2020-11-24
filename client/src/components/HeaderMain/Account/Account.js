import React, { memo, useContext } from 'react';
import { DispatchContext } from '../../../Context/context';
import './accountIcon.scss';

export const AccountIcon = memo(() => {
  const dispatch = useContext(DispatchContext);

  const showAccount = () => {
    dispatch({ type: 'ACCOUNT_OPEN' });
  };
  return (
    <svg
      onClick={showAccount}
      id='accountIcon'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'>
      <path
        className='accountPath'
        d='M3,3v18h18V3H3z M9.5,10.5C9.5,9.122,10.622,8,12,8c1.379,0,2.5,1.122,2.5,2.5S13.379,13,12,13
	C10.622,13,9.5,11.878,9.5,10.5z M7.101,19c0.465-2.279,2.484-4,4.899-4s4.434,1.721,4.899,4H7.101z M19,19h-0.08
	c-0.333-2.311-1.794-4.256-3.81-5.262c0.853-0.819,1.39-1.965,1.39-3.238C16.5,8.019,14.481,6,12,6s-4.5,2.019-4.5,4.5
	c0,1.273,0.537,2.419,1.389,3.238C6.874,14.744,5.413,16.689,5.08,19H5V5h14V19z'
      />
    </svg>
  );
});
