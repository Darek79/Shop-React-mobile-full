import React from 'react';

export const TrashBin = ({  cl, fn, ind, s }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    data-size={s}
    data-index={ind}
    viewBox='0 0 24 24'
    className={cl}
    onClick={(e) => fn(e)}>
    <path d='M20 5h-4V2H8v3H4v2h1v14h14V7h1V5zM10 4h4v1h-4V4zm7 15H7V7h10v12z' />
    <path d='M9 9h2v8H9zM13 9h2v8h-2z' />
  </svg>
);
