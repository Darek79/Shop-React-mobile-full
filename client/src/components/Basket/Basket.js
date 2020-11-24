import React, { useState, useEffect, Fragment, useRef, createRef } from 'react';
import { Image } from '../Img/Img';
import CardButton from '../Button/Button';
import { ClosingXdefault } from '../ClosingX/ClosingXdefault';
import { connect } from 'react-redux';
import {
  chgItemQty,
  chgItemSize,
  removeItemFromCart,
  resetBasket,
  verifyTheBakset,
  postToEndpoint,
} from '../../redux/actions/basketActions';
import { showBasket } from './../../redux/filters/filterHelpers';
import { v1 } from 'uuid';
import { Arrow } from './../PushableContainer/arrow';
import { QualityList } from './Quantity';
import { SizeList } from './SizeList';
import { TrashBin } from './../TrashBin/trashBin';
import { isMobile } from './../../helper/helperFN';

//import Image import BTN import closingX
import './Basket.scss';

const BasketCard = ({
  basket,
  chgItemQty,
  chgItemSize,
  resetBasket,
  removeItemFromCart,
  checkAmount = false,
  compDesc = 'Shopping Bag',
  postToEndpoint,
  verifyTheBakset,
}) => {
  let myId;
  const getDataRef = useRef(null);
  const toPayRef = useRef(checkAmount);
  const [listQty, setShowListQty] = useState(false);
  const [listSize, setShowListSize] = useState(false);
  const refArr = [];

  useEffect(() => {
    console.log(basket && basket.length, 'IN BASKET');
    if (basket.length > 0) {
      console.log('HERE BASKET');
      console.log(isMobile(), 'MOBILE?');
      postToEndpoint('api/checkprods', basket, verifyTheBakset);
    }
    // if (verifiedBasket.length > 0) {
    //   totalAmount(verifiedBasket.reduce((ac, it) => ac + it.val, 0).toFixed(2));
    // }
  }, []);

  useEffect(() => {
    window.onload = () => {
      console.log('LOAD');
      // resetBasket();
    };
  }, []);
  const whenScroll = () => {
    if (listQty) {
      setShowListQty(false);

      return;
    }
    if (listSize) {
      setShowListSize(false);
      return;
    }
  };
  const chgQty = () => {
    // resetBasket();

    setShowListQty(true);
  };
  const chgSize = () => {
    setShowListSize(true);
  };
  const closeQtyListOnX = () => {
    setShowListQty(false);
  };
  const closeSizeListOnX = () => {
    setShowListSize(false);
  };
  const getRef = (e) => {
    getDataRef.current = {
      ind: e.target.parentElement.getAttribute('data-index'),
      size: e.target.parentElement.getAttribute('data-size'),
    };
  };
  const getQtyVal = (e) => {
    chgItemQty(
      e.target.value,
      getDataRef.current.size,
      basket[getDataRef.current.ind].id
    );
  };
  const getSizeVal = (e) => {
    chgItemSize(
      getDataRef.current.size,
      e.target.innerHTML,
      basket[getDataRef.current.ind].id
    );
  };
  const removeItem = (e) => {
    e.stopPropagation();
    removeItemFromCart(
      basket[e.target.getAttribute('data-index')].id,
      e.target.getAttribute('data-size')
    );
  };
  return (
    <section className='basket_full_wrapper'>
      {console.log(basket, 'REDUX BASKET')}
      <div className='basket_totalSummary'>
        <h2>{compDesc}</h2>
        <p>
          total value:
          {basket.reduce((ac, it) => ac + it.val, 0).toFixed(2)}
        </p>
      </div>
      <div className='basket_prods_wrapper'>
        {listQty ? (
          <QualityList
            fn={closeQtyListOnX}
            fnVal={getQtyVal}
            cl='basket_Qty_list'
          />
        ) : undefined}
        {listSize ? (
          <SizeList
            fn={closeSizeListOnX}
            fnVal={getSizeVal}
            cl='basket_Size_list'
          />
        ) : undefined}
        {basket.map((item, i) => {
          myId = createRef();
          refArr.push(myId);
          return (
            <section className='basket_wrapper' key={v1()}>
              <div className='basket_maindesc_wrapper'>
                <Image
                  c='basket_img'
                  s={item && item.photo}
                  small={item && item.photo}
                  medium={item && item.photo}
                  big={item && item.photo}
                  a='basket_img'
                />
                <div
                  className='basket_dscWrapper'
                  data-index={i}
                  data-size={item && item.size}
                  ref={myId}
                  onClick={(e) => getRef(e)}>
                  <p className='basket_dsc'>{item && item.title}</p>
                  <p className='basket_dsc'>{item && item.desc}</p>
                  <p className='basket_dsc'>{item && item.val.toFixed(2)}</p>
                  <p className='basket_dsc' onClick={chgQty}>
                    quantity: {item && item.qty}
                    <Arrow clSvg='basket_arr' />
                  </p>
                  <p className='basket_dsc' onClick={chgSize}>
                    size: {item && item.size}
                    <Arrow clSvg='basket_arr' />
                  </p>
                  <TrashBin
                    cl='basket_trash'
                    s={item && item.size}
                    ind={i}
                    fn={removeItem}
                  />
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
};

const storage = ({ basketReducer }) => ({
  basket: showBasket(basketReducer),
});

export default connect(storage, {
  chgItemQty,
  chgItemSize,
  resetBasket,
  removeItemFromCart,
  verifyTheBakset,
  postToEndpoint,
})(BasketCard);

// import React, { useState, useEffect, Fragment, useRef, createRef } from 'react';
// import { Image } from '../Img/Img';
// import CardButton from '../Button/Button';
// import { ClosingXdefault } from '../ClosingX/ClosingXdefault';
// import { connect } from 'react-redux';
// import {
//   chgItemQty,
//   chgItemSize,
//   removeItemFromCart,
//   resetBasket,
//   verifyTheBakset,
//   postToEndpoint,
// } from '../../redux/actions/basketActions';
// import { showBasket } from './../../redux/filters/filterHelpers';
// import { v1 } from 'uuid';
// import { Arrow } from './../PushableContainer/arrow';
// import { QualityList } from './Quantity';
// import { SizeList } from './SizeList';
// import { TrashBin } from './../TrashBin/trashBin';
// import { isMobile } from './../../helper/helperFN';

// //import Image import BTN import closingX
// import './Basket.scss';

// const BasketCard = ({
//   basket,
//   chgItemQty,
//   chgItemSize,
//   resetBasket,
//   removeItemFromCart,
//   checkAmount = false,
//   compDesc = 'Shopping Bag',
//   verifyTheBakset,
// }) => {
//   let myId;
//   const getDataRef = useRef(null);
//   const toPayRef = useRef(checkAmount);
//   const [listQty, setShowListQty] = useState(false);
//   const [listSize, setShowListSize] = useState(false);
//   const [verifiedBasket, setVerifiedBasket] = useState([]);
//   const refArr = [];

//   useEffect(() => {
//     if (basket.length > 0) {
//       console.log('----->');
//       postToEndpoint('api/checkprods', basket, verifyTheBakset);
//     }
//     // if (verifiedBasket.length > 0) {
//     //   totalAmount(verifiedBasket.reduce((ac, it) => ac + it.val, 0).toFixed(2));
//     // }
//   }, [basket]);

//   useEffect(() => {
//     window.onload = () => {
//       console.log('-----LOAD-------');
//       // resetBasket();
//     };
//   }, []);
//   const whenScroll = () => {
//     if (listQty) {
//       setShowListQty(false);

//       return;
//     }
//     if (listSize) {
//       setShowListSize(false);
//       return;
//     }
//   };
//   const chgQty = () => {
//     // resetBasket();

//     setShowListQty(true);
//   };
//   const chgSize = () => {
//     setShowListSize(true);
//   };
//   const closeQtyListOnX = () => {
//     setShowListQty(false);
//   };
//   const closeSizeListOnX = () => {
//     setShowListSize(false);
//   };
//   const getRef = (e) => {
//     getDataRef.current = {
//       ind: e.target.parentElement.getAttribute('data-index'),
//       size: e.target.parentElement.getAttribute('data-size'),
//     };
//   };
//   const getQtyVal = (e) => {
//     chgItemQty(
//       e.target.value,
//       getDataRef.current.size,
//       basket[getDataRef.current.ind].id
//     );
//   };
//   const getSizeVal = (e) => {
//     chgItemSize(
//       getDataRef.current.size,
//       e.target.innerHTML,
//       basket[getDataRef.current.ind].id
//     );
//   };
//   const removeItem = (e) => {
//     e.stopPropagation();
//     removeItemFromCart(
//       basket[e.target.getAttribute('data-index')].id,
//       e.target.getAttribute('data-size')
//     );
//   };
//   const showRealPrice = () => {
//     console.log('real price');
//   };
//   return (
//     <section className='basket_full_wrapper'>
//       <div className='basket_totalSummary'>
//         {console.log(verifiedBasket, '--BASKET<----')}
//         <h2>{compDesc}</h2>
//         <p>
//           total value:
//           {basket.reduce((ac, it) => ac + it.val, 0).toFixed(2)}
//         </p>
//       </div>
//       <div className='basket_prods_wrapper'>
//         {listQty ? (
//           <QualityList
//             fn={closeQtyListOnX}
//             fnVal={getQtyVal}
//             cl='basket_Qty_list'
//           />
//         ) : undefined}
//         {listSize ? (
//           <SizeList
//             fn={closeSizeListOnX}
//             fnVal={getSizeVal}
//             cl='basket_Size_list'
//           />
//         ) : undefined}
//         {basket.map((item, i) => {
//           myId = createRef();
//           refArr.push(myId);
//           return (
//             <section className='basket_wrapper' key={v1()}>
//               <div className='basket_maindesc_wrapper'>
//                 <Image
//                   c='basket_img'
//                   s={item && item.photo}
//                   small={item && item.photo}
//                   medium={item && item.photo}
//                   big={item && item.photo}
//                   a='basket_img'
//                 />
//                 <div
//                   className='basket_dscWrapper'
//                   data-index={i}
//                   data-size={item && item.size}
//                   ref={myId}
//                   onClick={(e) => getRef(e)}>
//                   <p className='basket_dsc'>{item && item.title}</p>
//                   <p className='basket_dsc'>{item && item.desc}</p>
//                   <p className='basket_dsc'>{item && item.val.toFixed(2)}</p>
//                   <p className='basket_dsc' onClick={chgQty}>
//                     quantity: {item && item.qty}
//                     <Arrow clSvg='basket_arr' />
//                   </p>
//                   <p className='basket_dsc' onClick={chgSize}>
//                     size: {item && item.size}
//                     <Arrow clSvg='basket_arr' />
//                   </p>
//                   <TrashBin
//                     cl='basket_trash'
//                     s={item && item.size}
//                     ind={i}
//                     fn={removeItem}
//                   />
//                 </div>
//               </div>
//             </section>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// const storage = ({ basketReducer }) => ({
//   basket: showBasket(basketReducer),
// });

// export default connect(storage, {
//   chgItemQty,
//   chgItemSize,
//   resetBasket,
//   removeItemFromCart,
//   postToEndpoint,
//   verifyTheBakset,
// })(BasketCard);
