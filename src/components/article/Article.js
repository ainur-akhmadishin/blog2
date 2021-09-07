import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import Card from '../card';
import { getSingleArticle } from '../../redux/actions';

const Article = ({ singleArticle, getArticle, loading }) => {
  Article.defaultProps = {
    singleArticle: {},
    loading: true,
    getArticle: () => {},
  };

  const { slug } = useParams();

  const flag = Object.keys(singleArticle).length;

  useEffect(() => getArticle(slug), [slug, getArticle]);

  const spinner = loading ? <Spin size="large" /> : null;
  const content = !loading && flag ? <Card article={singleArticle.article} /> : null;

  return (
    <div>
      {spinner}
      {content}
    </div>
  );
};

Article.propTypes = {
  singleArticle: PropTypes.instanceOf(Object),
  getArticle: PropTypes.func,
  loading: PropTypes.bool,
};

function mapStateToProps(state) {
  const { singleArticle } = state.article;
  const { loading } = state.loading;
  return { singleArticle, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    getArticle: (slug) => dispatch(getSingleArticle(slug)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
