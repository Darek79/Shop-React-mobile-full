import { JWT_TOKEN, VERIFY_TOKEN, LOGOUT } from '../actionVars';
const initState = {};

export const jwtTokenReducer = (state = initState, action) => {
  switch (action.type) {
    case JWT_TOKEN:
      return action.token;
    case VERIFY_TOKEN:
      console.log(action);
      return {
        ...state,
        status: action.verified.status,
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
