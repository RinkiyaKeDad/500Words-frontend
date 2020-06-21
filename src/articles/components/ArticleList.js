import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import ArticleItem from './ArticleItem';
import Button from '../../shared/components/FormElements/Button';
import './ArticleList.css';

const ArticleList = props => {
  if (props.items.length === 0) {
    return (
      <div className='article-list center'>
        <Card>
          <h2>No articles found. Maybe create one?</h2>
          <Button to='/articles/new'>Share Article</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className='article-list'>
      {props.items.map(article => (
        <ArticleItem
          key={article.id}
          id={article.id}
          title={article.title}
          content={article.content}
          creatorId={article.creator}
          onDelete={props.onDeleteArticle}
        />
      ))}
    </ul>
  );
};

export default ArticleList;
