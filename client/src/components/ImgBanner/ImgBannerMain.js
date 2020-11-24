import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import wrapper from './bannerHOC';
// import BuyButton from './../Button/Button';
import {
  calcVWport,
  isMobile,
  listener,
  createId,
} from './../../helper/helperFN';

import { Dot } from './Dot';
import './ImgBannerMain.scss';

import large1 from './../../../public/img/nike-official-site1.png';
import medium1 from './../../../public/img/nike-official-site1.png';
import small1 from './../../../public/img/nike-official-site1.png';

import large2 from './../../../public/img/nike-official-site2.png';
import medium2 from './../../../public/img/nike-official-site2.png';
import small2 from './../../../public/img/nike-official-site2.png';

import large3 from './../../../public/img/nike-official-site3.png';
import medium3 from './../../../public/img/nike-official-site3.png';
import small3 from './../../../public/img/nike-official-site3.png';

const imgArr = [
  { small1, medium1, large1 },
  { small2, medium2, large2 },
  { small3, medium3, large3 },
];
// const idArr = createId(3);
// const idDotArr = createId(3);

const ImgBanner = ({
  // imgArr,
  idArr,
  idDotArr,
  wrapperStyle,
  imgStyle,
  int,
  wrapperClass,
  sliderWrapperClass,
  imgClass,
  h = '100vh',
}) => {
  const [nr, setNr] = useState(0);
  //const [imgArr, setImgData] = useState([]);
  const [stop, setStop] = useState(true);

  useEffect(() => {
    window.addEventListener('touchstart', listener);
    return () => removeEventListener('touchstart', listener);
  });

  // useEffect(() => {
  //   let interval;

  //   if (stop) {
  //     interval = setInterval(
  //       () => setNr((p) => (p + 1 === imgArr.length ? 0 : (p % 2) + 1)),
  //       int
  //     );
  //   }
  //   return () => clearInterval(interval);
  // }, [stop]);

  useEffect(() => {
    console.log('here');
  }, []);

  const forward = () => {
    setNr((p) => (p + 1 === imgArr.length ? 0 : (p % 2) + 1));
  };

  const stopIt = () => {
    setStop(() => false);
  };
  const resumeIt = () => {
    setStop(() => true);
  };
  const showImgDot = (e) => {
    let target = e.target.getAttribute('data-index');
    setNr(() => parseFloat(target));

    if (isMobile()) {
      setStop(() => true);
    }
  };

  return (
    <section id={sliderWrapperClass} style={{ height: `calc(${h} - 20%)` }}>
      {/* {imgArr &&
        imgArr.map((el) => {
          return <img src={`http://localhost:3000${el.photos[0]}`} alt='img' />;
        })} */}
      {/* {imgArr && <img src={`${imgArr[0].photos[0]}`} alt='img' />} */}
      <div
        className={wrapperClass}
        onMouseOver={stopIt}
        onMouseLeave={resumeIt}
        onClick={forward}
        key={idArr[nr]}
        style={wrapperStyle}>
        {/* <div className='imgBannerBtnWrapper'>
        
          
        </div> */}
        <NavLink to={'/c/men'}>
          <img
            className={imgClass}
            style={imgStyle}
            src={`${imgArr[nr][`medium${nr + 1}`]}`}
            srcSet={`${imgArr[nr][`small${nr + 1}`]} 420w, ${
              imgArr[nr][`medium${nr + 1}`]
            } 768w,${imgArr[nr][`large${nr + 1}`]} 1280w`}
            alt={`img${nr}`}
          />
        </NavLink>
      </div>

      <div id='dotWrapper'>
        {imgArr &&
          imgArr.map((el, i) => {
            return (
              <Dot
                key={idDotArr[i]}
                index={i}
                fnStop={stopIt}
                fnShowImg={showImgDot}
                effectClass1={nr === i ? `circle1Effect` : ''}
                effectClass2={nr === i ? `circle2Effect` : ''}
              />
            );
          })}
      </div>
    </section>
  );
};

export default wrapper()(ImgBanner);

// {arr.map(img => <Image key={v1ID()} c='imageItem' s={img.small} a='product_img' small={img.small} medium={img.medium} big={img.big}/>)}
//srcSet={`${imgArr.data.msg[nr].photos[nr]} 420w, ${imgArr.data.msg[nr].photos[nr]} 768w,${imgArr.data.msg[nr].photos[nr]} 1280w`}
