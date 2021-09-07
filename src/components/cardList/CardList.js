import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination, Spin } from 'antd';

import PropTypes from 'prop-types';
import { updatePage, getArticles } from '../../redux/actions';
import Card from '../card';

import 'antd/dist/antd.css';
import classes from './CardList.module.scss';

const CardList = ({ articles, onPage, fetchData, page, loading }) => {
  CardList.defaultProps = {
    articles: [],
    loading: false,
    onPage: () => {},
    fetchData: () => {},

    page: 1,
  };

  useEffect(() => fetchData(page), [fetchData, page]);

  const content = articles.map((el) => <Card key={el.slug} article={el} />);

  const spinner = loading ? <Spin size="large" /> : null;
  const result = !loading ? content : null;
  const pagination = !loading ? (
    <Pagination
      className={classes['ant-pagination']}
      defaultCurrent={page}
      total={500}
      size="small"
      defaultPageSize={20}
      showSizeChanger={false}
      onChange={onPage}
    />
  ) : null;

  return (
    <div className={classes.CardList}>
      <div className={classes['CardList--spinner']}>{spinner}</div>
      {result}
      {pagination}
    </div>
  );
};

CardList.propTypes = {
  articles: PropTypes.instanceOf(Array),
  loading: PropTypes.bool,
  onPage: PropTypes.func,
  fetchData: PropTypes.func,
  page: PropTypes.number,
};

function mapStateToProps(state) {
  const { articles, page } = state.articles;
  const { loading } = state.loading;
  return { articles, page, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    onPage: (page) => dispatch(updatePage(page)),
    fetchData: (page) => dispatch(getArticles(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
