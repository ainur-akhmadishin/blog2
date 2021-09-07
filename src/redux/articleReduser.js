import { GET_ARTICLE } from './types';

const initState = {
  singleArticle: [],
};

const articleReduser = (state = initState, action) => {
  switch (action.type) {
    case GET_ARTICLE: {
      return {
        ...state,
        singleArticle: action.payload,
      };
    }

    default:
      return state;
  }
};

export default articleReduser;
