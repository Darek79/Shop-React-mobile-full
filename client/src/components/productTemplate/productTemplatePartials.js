import React, { Fragment } from 'react';

export const SmallProd = ({ c, t, p, prodCd, idTitle, idDesc, idPrize }) => (
  <div className={prodCd}>
    <p id={idTitle}>{c}</p>
    <p id={idDesc}>{t}</p>
    <p id={idPrize}>{p}</p>
  </div>
);

export const BigProd = ({ prodCd, t, d, p }) => (
  <Fragment>
    <div className={prodCd}>
      <p>{t}</p>
      <p>{d}</p>
    </div>
    <p>{p}</p>
  </Fragment>
);
