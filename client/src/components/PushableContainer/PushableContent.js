//Object.entries(obj)-->return key+value
//Object.value(obj)--> return value
import React, { useState,memo } from 'react';
import { Arrow } from './arrow';
import { v1 } from 'uuid';
// import './PushableContent.scss';

export default memo(({
  pc_w,
  pc_h,
  pc_co,
  lh,
  rh,
  pc,
  ulC,
  ra,
  idSvg,
  clSvg,
  clEl,
  strokeC,
}) => {
  const [isOpen, setOpen] = useState(false);
  const openContainer = () => {
    setOpen((p) => !p);
  };
  return (
    <section className={pc_w}>
      <div className={pc_h} onClick={openContainer}>
        {lh ? lh : undefined}
        {rh ? rh : undefined}
        <Arrow
          clSvg={`pdp_AddInfos_svg ${isOpen ? 'pc_a_isOpen' : ''}`}
          clEl={`pdp_AddInfos_el `}
          strokeC={strokeC}
        />
      </div>
      <div className={`pc_co ${isOpen ? `pc_w_isOpen` : ''}`}>
        <ul className={ulC}>
          {pc &&
            Object.values(pc).map((el) => {
              return <li key={v1()}>{el}</li>;
            })}
        </ul>
      </div>
    </section>
  );
} );
