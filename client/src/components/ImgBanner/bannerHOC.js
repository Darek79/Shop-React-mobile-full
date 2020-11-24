import React from 'react';
import { calcVWport, createId } from './../../helper/helperFN';

export default () => (WC) => () => {
  return (
    <WC
      int={4000}
      idArr={createId(3)}
      idDotArr={createId(3)}
      wrapperClass='wrapper'
      sliderWrapperClass='sliderWrapper'
      imgClass={`item itemEffect`}
      h={calcVWport(window.innerWidth)}
    />
  );
};

// export default () => (WC) => () => {
//   return (
//     <WC
//       int={4000}
//       idArr={createId(3)}
//       idDotArr={createId(3)}
//       wrapperClass='wrapper'
//       sliderWrapperClass='sliderWrapper'
//       imgClass={`item itemEffect`}
//       h={calcVWport(window.innerWidth)}
//     />
//   );
// };
