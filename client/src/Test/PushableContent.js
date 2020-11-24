//Object.entries(obj)-->return key+value
//Object.value(obj)--> return value
import React, { useState } from 'react';
import { Arrow } from './arrow';
import './PushableContent.scss';

export default ({
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
}) => {
  const [isOpen, setOpen] = useState(false);
  const openContainer = () => {
    setOpen((p) => !p);
  };
  return (
    <section className={pc_w} onClick={openContainer}>
      <div className={pc_h}>
        {lh ? lh : undefined}
        {rh ? rh : undefined}
        <Arrow
          clSvg={`pdp_AddInfos_svg ${isOpen ? 'pc_a_isOpen' : ''}`}
          clEl={`pdp_AddInfos_el `}
        />
      </div>
      <div className={`pc_co ${isOpen ? `pc_w_isOpen` : ''}`}>
        <ul className={ulC}>
          {pc &&
            Object.values(pc).map((el) => {
              return <li style={{ listStyleType: 'initial' }}>{el}</li>;
            })}
        </ul>
      </div>
    </section>
  );
};
