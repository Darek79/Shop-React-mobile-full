import { SETPRODSIZE } from '../actionVars';
const initState = [];

export const addSize = (state = initState, action) => {
  switch (action.type) {
    case SETPRODSIZE:
      return action.sizeObj;
    default:
      return state;
  }
};
