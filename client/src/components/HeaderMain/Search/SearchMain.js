import React, { useContext } from 'react';
import { DispatchContext } from '../../../Context/context';

import './SearchMain.scss';

export const SearchMain = () => {
  const dispatch = useContext(DispatchContext);

  const searchMainClick = () => {
    dispatch({ type: 'SEARCH_OPEN' });
  };

  return (
    <svg
      id='searchSVG'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      onClick={searchMainClick}>
      <path
        className='searchPath'
        d='M21.707,20.293l-3.682-3.682C19.258,15.071,20,13.122,20,11c0-4.962-4.038-9-9-9s-9,4.038-9,9s4.038,9,9,9
	c2.122,0,4.071-0.742,5.611-1.975l3.682,3.682L21.707,20.293z M4,11c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S4,14.86,4,11z'
      />
    </svg>
  );
};
