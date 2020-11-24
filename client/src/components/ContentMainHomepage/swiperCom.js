import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import ProductTemplateSmall from './../productTemplate/productTemplateGeneral';
import { fetchData, showData } from '../../redux/actions/fetchActions';
import { showOneCategoryProd } from './../../redux/filters/filterHelpers';
import { isMobile, fetchFiles } from '../../helper/helperFN';
import { v1 } from 'uuid';

import './swiperCom.scss';
// import { listener } from '../../helper/helperFN';

export default ({
  url,
  nrs = 0,
  nre = 0,
  start = 0,
  swipePx = 300,
  mouseDown = false,
  title,
  fetchFromLocal = true,
}) => {
  const [data, setData] = useState([]);
  const red = window.location.pathname;
  useEffect(() => {
    try {
      if (
        sessionStorage.length > 0 &&
        sessionStorage.getItem(title).length > 0
      ) {
        console.log(1);
        const nData = JSON.parse(sessionStorage.getItem(title));
        setData(() => nData);
      } else {
        console.log(2);
        fetchFiles(url, setData);
      }
    } catch (error) {
      console.log(3);
      sessionStorage.clear();
      fetchFiles(url, setData);
    }
    // if (JSON.parse(sessionStorage.getItem(title)) === null) {
    //   sessionStorage.clear();
    //   fetchFiles(url, setData);
    //   sessionStorage.setItem(title, JSON.stringify(data));
    // }

    // if (sessionStorage.getItem(title) !== null) {
    //   console.log('hereTOO');
    //   const parsedData = JSON.parse(sessionStorage.getItem(title));
    //   setData(() => parsedData);
    // }
  }, []);

  useEffect(() => {
    console.log(data);
    console.log(title);
    if (data.length > 0) {
      sessionStorage.setItem(title, JSON.stringify(data));
    }
    console.log(data, 'SETDATA');
  }, [data, title]);
  const [swipePixel, setSwipePixel] = useState(0);

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
    console.log('down');
    console.log(e.clientX, 'D');
    nrs = e.clientX;
    mouseDown = true;
  };

  const whenMouseMove = (e) => {
    if (nrs && mouseDown) {
      mouseDown = false;
      nre = e.clientX;
      console.log(e.clientX, 'M');
      console.log(nrs - nre);
      if (nrs - nre > 0 && nre !== 0 && swipePixel - swipePx !== -900) {
        setSwipePixel((p) => p - swipePx);
      }
      if (nrs - nre < 0 && nre !== 0 && swipePixel + swipePx !== 300) {
        setSwipePixel((p) => p + swipePx);
      }
    }
  };
  const whenMouseUp = (e) => {
    e.preventDefault();
    console.log('up');
    console.log(e.movementX);
  };
  return (
    <section className={'productProdWrapper'}>
      <p>{title}</p>
      <section
        className={`innerProdWrapper`}
        onTouchStart={(e) => whenTouch(e)}
        onTouchMove={(e) => whenMove(e)}
        onTouchEnd={(e) => whenTouchEnd(e)}
        onMouseDown={(e) => whenMouseDown(e)}
        onMouseMove={(e) => whenMouseMove(e)}
        onMouseUp={(e) => whenMouseUp(e)}
        style={{ transform: `translate(${swipePixel}px)` }}>
        {console.log(data, 'STATE')}
        {data &&
          data.map((p, i) => {
            return (
              <NavLink
                to={{
                  pathname: `/p/${title}/${p.title}/${p.id}`,
                  state: { referrer: 'swiperProd' },
                }}
                key={v1()}>
                <ProductTemplateSmall
                  prodCd='frontDesc desc'
                  prodImg='prodImg'
                  l={p.photos && p.photos[0]}
                  d={p.artcategory}
                  t={p.title}
                  p={p.price}
                  // l={
                  //   'http://localhost:8080/newFall2020/b7164a10-fd25-11ea-95f1-ff14921ff326-ja1.png'
                  // }
                  // d={'p.artcategory'}
                  // t={'p.title'}
                  // p={'p.price'}
                />
              </NavLink>
            );
          })}
      </section>
    </section>
  );
};

// const mapStateToProps = (state, p) => {
//   const { reducer } = p;
//  if(reducer==='HighlightsReducer'){
//   return {
//     dataH: state[`${reducer}`]
//   };
//  }
//  if(reducer==='TrendsReducer'){
//   return {
//     dataT: state[`${reducer}`]
//   };
//  }

// };
