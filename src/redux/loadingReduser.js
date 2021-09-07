import { LOADING } from './types';

const initState = {
  loading: true,
};

const loadingReduser = (state = initState, action) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    default:
      return state;
  }
};

export default loadingReduser;
