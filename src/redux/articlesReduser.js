import { GET_ARTICLES, PAGE } from './types';

const initState = {
  articles: [],
  page: 1,
};

const articlesReduser = (state = initState, action) => {
  switch (action.type) {
    case GET_ARTICLES: {
      return {
        ...state,
        articles: action.payload.articles,
      };
    }

    case PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }

    default:
      return state;
  }
};

export default articlesReduser;
