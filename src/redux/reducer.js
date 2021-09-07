import { combineReducers } from 'redux';
import articlesReduser from './articlesReduser';
import articleReduser from './articleReduser';
import loadingReduser from './loadingReduser';
import userReducer from './userReducer';

const reducer = combineReducers({
  articles: articlesReduser,
  article: articleReduser,
  loading: loadingReduser,
  user: userReducer,
});

export default reducer;
