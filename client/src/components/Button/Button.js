import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

export default ({ txt, fn, btnC, id, r }) => (
  <Fragment>
    <button
      ref={r ? r : undefined}
      className={btnC}
      id={id ? id : undefined}
      onClick={fn}
      type='button'>
      {txt}
    </button>
  </Fragment>
);

