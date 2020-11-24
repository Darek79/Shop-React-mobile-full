import React, { useState, useEffect } from 'react';
import BasketButton from '../Button/LinkButton';
import { v1 } from 'uuid';
import { compareTwoArrays } from './../../helper/helperFN';
const availableSizes = [
  35.5,
  36,
  36.5,
  37,
  37.5,
  38,
  38.5,
  39,
  39.5,
  40,
  40.5,
  41,
  41.5,
  42,
  42.5,
];

export const ShowSizes = ({ size = [], fn, s }) => {
  const [isAvl, setIsAvl] = useState([]);

  useEffect(() => {
    if (typeof size[0] === 'number') {
      setIsAvl(() => compareTwoArrays(availableSizes, size));
    }
    if (typeof size[0] === 'string') {
      setIsAvl(() => size);
    }
  }, [size]);
  return (
    <section className={`prodPageSizes ${s ? '' : 'pickSizeWrapper'}`}>
      {console.log(fn)}
      {isAvl && isAvl[0] === 'number'
        ? isAvl.map((el) => {
            return (
              <button
                key={v1()}
                disabled={el.v}
                className={`pdp_sizeButton ${
                  !el.v ? 'pdp_sizeButtonH' : ''
                } pdp_sizeButtonP`}
                onClick={(e) => fn(e)}
                data-size={el.s}>
                {`EU ${el.s}`}
              </button>
            );
          })
        : isAvl.map((el) => {
            return (
              <button
                key={v1()}
                disabled={false}
                className={`pdp_sizeButtonS 'pdp_sizeButtonH' 
               pdp_sizeButtonP`}
                onClick={(e) => fn(e)}
                data-size={el}>
                {el}
              </button>
            );
          })}
      {s ? undefined : <h3 className='pickSize'>Please pick a size</h3>}
    </section>
  );
};
