import { FETCHQUERY, SHOWDATA } from '../actionVars';
import axios from 'axios';

export const showData = (data = []) => ({
  type: SHOWDATA,
  data: data.data,
});

export const fetchData = (fn, url) => {
  return async () => {
    const data = await axios.get(url);
    console.log(data, 'DATA');
    fn(data);
  };
};
