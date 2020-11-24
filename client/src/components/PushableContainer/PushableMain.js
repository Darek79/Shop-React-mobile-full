import React from 'react';
import Pushable from './PushableContent';
import TitleEl from './wrapperDiv';

// import './PushableContent.scss';

export const PushableMain = () => (
  <section id='pdp_DescModuleContainer'>
    <Pushable
      pc_w='pc_w'
      pc_h='pc_h'
      lh={<TitleEl txt='Shipping Infos' cl='pdp_AddInfos_l' />}
      pc_co='pc_co'
      ulC='pdp_pushAbleList'
      pc={{
        a: 'Luctus venenatis lectus magna',
        b: 'Id aliquet lectus proin',
        c: 'Nulla facilisi nullam vehicula',
      }}
    />
    <Pushable
      pc_w='pc_w'
      pc_h='pc_h'
      lh={<TitleEl txt='Additional Infos' cl='pdp_AddInfos_l' />}
      pc_co='pc_co'
      ulC='pdp_pushAbleList'
      pc={{
        a: 'Viverra nam libero',
        b: 'Tristique senectus et netus et',
        c: 'Turpis cursus in hac habitasse',
      }}
    />
    <Pushable
      pc_w='pc_w'
      pc_h='pc_h'
      lh={<TitleEl txt='Size & Fit' cl='pdp_AddInfos_l' />}
      pc_co='pc_co'
      ulC='pdp_pushAbleList'
      pc={{
        a: 'Donec adipiscing tristique risus',
        b: 'Nibh praesent tristique magna sit amet',
        c: 'Tristique senectus et netus et',
      }}
    />
  </section>
);
