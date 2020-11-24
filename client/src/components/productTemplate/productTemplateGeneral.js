import React, { Fragment } from 'react';
import { calcVWport } from './../../helper/helperFN';
import { SmallProd, BigProd } from './productTemplatePartials';

export default ({ prodCd, prodImg, l, d, t, p }) => (
  <Fragment>
    <img className={prodImg} src={l} alt={d} />
    <SmallProd t={t} d={d} p={p} prodCd={prodCd} />
  </Fragment>
);
