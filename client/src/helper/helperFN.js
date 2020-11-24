import { v1 } from 'uuid';
import axios from 'axios';

const debArr = [];
export const createId = (n) => {
  const idArr = [];
  while (n > 0) {
    idArr.push(v1());
    n--;
  }
  return idArr;
};
export const calcVWport = (vp) => {
  const vpArr = [420, 768];
  const sorted = [];
  let ind = 0;

  vpArr.forEach((el, i) => {
    sorted.push(el - vp);
  });
  ind = sorted.findIndex((el) => el >= 0);
  console.log(
    ind >= 0
      ? `${vpArr[ind].toString()}px`
      : `${vpArr[vpArr.length - 1].toString()}px`
  );

  return ind >= 0
    ? `${vpArr[ind].toString()}px`
    : `${vpArr[vpArr.length - 1].toString()}px`;
};

export const isMobile = () => {
  var match = window.matchMedia || window.msMatchMedia;
  if (match) {
    var mq = match('(pointer:coarse)');
    return mq.matches;
  }
  return false;
};

export const listener = (e) => {
  console.log(window.matchMedia, window.msMatchMedia);
  console.log(e.target);
};

export const fetchFiles = async (url, fn) => {
  try {
    const res = await axios.get(url);
    console.log(res);
    fn(() => res.data);
  } catch (error) {
    return error.mesage;
  }
};
export const fetchFilesPagination = async (url, fn) => {
  try {
    const res = await axios.get(url);
    console.log(res);
    fn((p) => [...p, ...res.data]);
  } catch (error) {
    return error.mesage;
  }
};

export const compareTwoArrays = (arr1, arr2) => {
  let good = [];
  let bad = [];

  good = arr1.filter((el) => arr2.includes(el)).map((s) => ({ s, v: false }));
  bad = arr1.filter((el) => !arr2.includes(el)).map((s) => ({ s, v: true }));

  return good.concat(bad).sort((a, b) => (a.s > b.s ? 1 : -1));
};
export const refreshStore = (fn) => {
  const { pathname } = fn();
  const url = decodeURI(window.location.pathname);
  return url === pathname;
};

export const filterProd = (arr, id) => {
  return arr.filter((prod) => prod.id === id);
};
export const debounceClick = (d) => {
  debArr.push(d / 1000);
  // debounceClick({ id, price: data[0].price });
  if (debArr.length === 10) {
    debArr.length = 0;
  }
  if (debArr.length > 1) {
    if (debArr[debArr.length - 1] - debArr[debArr.length - 2] < 0.5) {
      debArr.length = 0;

      return false;
    }
  }
  return true;
};

export const checkLocalS = (item, obj) => {
  let stored = '';
  if (localStorage.getItem(item)) {
    stored = JSON.parse(localStorage.getItem(item));
    stored.push(obj);
    localStorage.setItem(item, JSON.stringify(stored));
    return;
  } else {
    localStorage.setItem(item, JSON.stringify([obj]));
  }
};

export const emailCheck = (str) => {
  return str.match(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
  );
};

export const verifyFields = (...args) => {
  let arr = [];
  [...args].forEach((f) => {
    if (f <= 0) {
      arr.push(false);
    }
  });
  return arr;
};
export const postToEndpoint = async (path, payload = [], fn) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `http://localhost:3000/${path}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: payload,
    });
    console.log(data, '---ACTION---');
    fn(data);
  } catch (error) {
    if (error) {
      console.log(error, 'error');
    }
  }
};
