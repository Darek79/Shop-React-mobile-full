import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

export default ({ txt, fn, btnC, id, r, linkC, path }) => (
  <NavLink
    className={linkC}
    to={{ pathname: path, state: { refferer: window.location.pathname } }}>
    <button
      ref={r ? r : undefined}
      className={btnC}
      id={id ? id : undefined}
      onClick={fn}
      type='button'>
      {txt}
    </button>
  </NavLink>
);
