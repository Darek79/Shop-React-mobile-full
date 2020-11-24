import React, { useState, useEffect, useRef } from 'react';
import spinner from './../../public/img/spinner.gif';

export default (WC) => ({ total = 200 }) => {
  const [isLoaded, setLoad] = useState(false);
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://www.paypal.com/sdk/js?client-id=AbeGrX4SqAnMxbZCt2yzm3-HLbD-16Byx_HQoV4Sz2KZNA1VyhsmsNOPlDsE9ByFA1N6lMSHT8ncobQX&currency=PLN';
    script.defer = true;
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(script);
    window.onload = () => {
      if (window.paypal) {
        setLoad(() => true);
      }
    };
  }, []);

  return (
    <section>
      {isLoaded ? (
        <WC total={total} />
      ) : (
        <img className='spinner' src={spinner} alt='spinner' />
      )}
    </section>
  );
};
