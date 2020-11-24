import React from 'react';

export const PDPDescription = ({
  d = 'In blandit non eros non maximus. Vivamus at mi at sem iaculis hendrerit non non nibh. Pellentesque vitae odio pretium, venenatis eros id, accumsan velit. Duis luctus bibendum massa nec commodo. Praesent egestas a risus et pretium.',
}) => (
  <section id='pdp_descriptionWrapper'>
    <p className='pdp_description'>{d}</p>
  </section>
);
