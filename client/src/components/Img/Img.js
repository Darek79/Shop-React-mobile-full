import React, { Fragment } from 'react';

export const Image = ({ c, s, a, small, medium, big, di, fn = null }) => (
  <Fragment>
    <img
      className={c}
      src={s}
      alt={a}
      srcSet={`${small} 420w, ${medium} 768w,${big} 1280w`}
      data-index={di ? di : null}
      onClick={fn !== null ? (e) => fn(e) : null}
    />
  </Fragment>
);

// onClick={e=>fn(e)}
