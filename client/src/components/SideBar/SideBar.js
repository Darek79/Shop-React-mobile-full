import React, { memo, useContext } from 'react';
import { DispatchContext } from './../../Context/context';

import './sidebar.scss';
import { ClosingX } from '../ClosingX/ClosingX';

export default memo((props) => {
  const dispatch = useContext(DispatchContext);
  const closeFn = (e) => {
    if (e.target.getAttribute('class').includes('loginStatus')) {
      dispatch({ type: 'ACCOUNT_OPEN' });
    }
    console.log(e.target.getAttribute('class'));
  };
  return (
    <div
      className={`${props.mainBanner} ${
        !props.propsAction ? props.mainBanner_closed : props.mainBanner_open
      }`}
      onClick={(e) => closeFn(e)}>
      <ClosingX action={props.x} />
      {props.children}
    </div>
  );
});
