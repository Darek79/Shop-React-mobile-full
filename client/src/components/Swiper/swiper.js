import React, { Fragment, useState } from 'react';
import { v1 } from 'uuid';
import { Image } from './../Img/Img';

//import './swiper.scss';
// import { listener } from '../../helper/helperFN';

export const Swiper = ({
  data,
  photos,
  nrs = 0,
  nre = 0,
  swipePx = 300,
  mouseDown = false,
}) => {
  // const { p } = data && data !== null && Array.isArray(data.photos);
  const [swipePixel, setSwipePixel] = useState(0);
  const [showFull, setShowFull] = useState(false);
  const [ind, setInd] = useState(0);

  const whenTouch = (e) => {
    nrs = e.touches[0].clientX;
  };
  const whenMove = (e) => {
    nre = e.touches[0].clientX;
  };
  const whenTouchEnd = (e) => {
    if (nrs - nre > 0 && nre !== 0 && swipePixel - swipePx !== -900) {
      setSwipePixel((p) => p - swipePx);
    }
    if (nrs - nre < 0 && nre !== 0 && swipePixel + swipePx !== 300) {
      setSwipePixel((p) => p + swipePx);
    }
  };
  const whenMouseDown = (e) => {
    nrs = e.clientX;
    mouseDown = true;
  };

  const whenMouseMove = (e) => {
    if (nrs && mouseDown) {
      mouseDown = false;
      nre = e.clientX;
      if (nrs - nre > 0 && nre !== 0 && swipePixel - swipePx !== -900) {
        setSwipePixel((p) => p - swipePx);
      }
      if (nrs - nre < 0 && nre !== 0 && swipePixel + swipePx !== 300) {
        setSwipePixel((p) => p + swipePx);
      }
    }
  };
  // const whenMouseUp = (e) => {
  //   e.preventDefault();
  // };

  const getIndex = (e) => {
    const ind = parseFloat(e.target.getAttribute('data-index'));
    setInd(() => ind);
  };

  const showFullImg = () => {
    setShowFull((p) => !p);
  };
  return (
    <Fragment>
      {console.log(data, photos, 'SW')}
      <section className={'swiperProdWrapper'}>
        {!showFull ? (
          <Image
            c='swiperFullProductImg'
            src={photos && photos[ind]}
            small={photos && photos[ind]}
            medium={photos && photos[ind]}
            big={photos && photos[ind]}
            di={ind}
            fn={showFullImg}
            a={`full product ${ind}`}
          />
        ) : undefined}
        {!showFull ? (
          <section
            className={`swiperInnerWrapper`}
            // onTouchStart={(e) => whenTouch(e)}
            // onTouchMove={(e) => whenMove(e)}
            // onTouchEnd={(e) => whenTouchEnd(e)}
            // onMouseDown={(e) => whenMouseDown(e)}
            // onMouseMove={(e) => whenMouseMove(e)}
            // onMouseUp={(e) => whenMouseUp(e)}
            // style={{ transform: `translate(${swipePixel}px)` }}
          >
            {console.log(data, 'DATA')}
            {data &&
              Array.isArray(data[0].photos) &&
              data[0].photos.map((p, i) => {
                console.log(p, 'P');
                return (
                  <Image
                    c='swiperProdImgB'
                    s={p}
                    a={`product image ${i + 1}`}
                    small={p}
                    medium={p}
                    big={p}
                    di={i}
                    fn={getIndex}
                    key={v1()}
                  />
                );
              })}
          </section>
        ) : undefined}
      </section>
      {showFull ? (
        <img
          src={photos && photos[ind]}
          alt={`full product ${ind}`}
          onClick={showFullImg}
          id='pdp_fullImgShow'
        />
      ) : undefined}
    </Fragment>
  );
};
