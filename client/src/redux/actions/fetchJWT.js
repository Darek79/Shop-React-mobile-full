import { JWT_TOKEN, VERIFY_TOKEN, LOGOUT } from '../actionVars';
import axios from 'axios';

export const resToken = (token = {}) => ({
  type: JWT_TOKEN,
  token,
});
export const verifyToken = (verified = {}) => ({
  type: VERIFY_TOKEN,
  verified,
});
export const logout = () => ({
  type: LOGOUT,
});
export const checkJWT = (path, dataObj = {}, fn, fnLogout) => {
  return async () => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `http://localhost:3000/${path}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: dataObj,
      });
      console.log(data, '----DATA----');
      fn(data);
    } catch (error) {
      console.log('ERROR TOKEN');
      fnLogout();
      // const { response: { data } = {} } = error;
      // if (error) fn(data);
    }
  };
};
