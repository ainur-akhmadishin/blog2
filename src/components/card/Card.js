import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Utilits from '../../servise/Utilits';
import classes from './Card.module.scss';

const Card = ({ article }) => {
  Card.defaultProps = {
    article: {},
  };

  const utilits = new Utilits();
  const { title, description, favoritesCount, author, tagList, updatedAt, slug } = article;

  const { username, image } = author;

  const tacg = tagList.length
    ? tagList.map((el) => (
        <li key={el} className={classes['Card--tag']}>
          {el}
        </li>
      ))
    : null;

  return (
    <section className={classes.Card}>
      <div className={classes['Card--article']}>
        <div>
          <span className={classes['Card--title']}>
            <Link to={`/article/${slug}`}>{title}</Link>
          </span>
          <input type="checkbox" id="ckeckbox" className={classes['Card--checkbox']} />
          <label htmlFor="ckeckbox">{favoritesCount}</label>
        </div>
        <ul className={classes['Card--tag-list']}>{tacg}</ul>
        <p className={classes['Card--description']}>{description}</p>
      </div>

      <div className={classes['Card--info']}>
        <div className={classes['Card--user-info']}>
          <div className={classes['Card--user']}>{username}</div>
          <div className={classes['Card--date']}>{utilits.formatDate(updatedAt)} </div>
        </div>
        <img src={image} alt="User" className={classes['Card--img']} />
      </div>
    </section>
  );
};

Card.propTypes = {
  article: PropTypes.instanceOf(Object),
};

export default Card;
