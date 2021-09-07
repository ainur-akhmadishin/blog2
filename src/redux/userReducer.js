import { REGISTRATION_ERROR, AUTH_ERROR, USER_DATA } from './types';

const initState = {
  error: [],
  authError: '',
  userData: {},
};

const articleReduser = (state = initState, action) => {
  switch (action.type) {
    case REGISTRATION_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case AUTH_ERROR:
      return {
        ...state,
        authError: action.payload,
      };

    case USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};

export default articleReduser;
