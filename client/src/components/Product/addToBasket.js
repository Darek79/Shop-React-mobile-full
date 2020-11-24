import React, { useEffect, useRef, useState } from 'react';
import AddToBasketButton from './../Button/Button';

export const AddToBasketMobile = ({ nrT = 0, nrB = 0, fn }) => {
  const myRef = useRef(null);
  const [inV, setInV] = useState(false);

  useEffect(() => {
    //console.log('runs');
    window.addEventListener('scroll', wasClicked);

    return () => {
      //console.log('clear');
      return window.removeEventListener('scroll', wasClicked);
    };
  }, [inV]);

  const wasClicked = () => {
    const { y } = myRef.current.getBoundingClientRect();
    if (window.innerHeight - y > 65 && y > -40) {
      nrT += 1;
      nrB = 0;
      if (nrT === 1) {
        //console.log('inView');
        setInV(() => true);
      }
    } else {
      nrT = 0;
      nrB += 1;
      if (nrB === 1) {
        //console.log('setToZero');
        setInV(() => false);
      }
    }
  };
  return (
    <section id='pdp_addToCartWrapper'>
      <AddToBasketButton
        txt='Add to Cart'
        id='pdp_addToCartButton'
        r={myRef}
        s={inV}
        btnC='btnC'
        fn={fn}
      />
      {!inV ? (
        <AddToBasketButton
          fn={fn}
          txt='Add to Cart'
          id='pdp_addToCartFloater'
          s={inV}
          btnC='btnC'
        />
      ) : undefined}
    </section>
  );
};
