import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ArticleList from '../components/ArticleList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserArticles = () => {
  const [loadedArticles, setLoadedArticles] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/articles/user/${userId}`
        );
        setLoadedArticles(responseData.articles);
      } catch (err) {}
    };
    fetchArticles();
  }, [sendRequest, userId]);

  const articleDeletedHandler = deletedArticleId => {
    setLoadedArticles(prevArticles =>
      prevArticles.filter(article => article.id !== deletedArticleId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedArticles && (
        <ArticleList
          items={loadedArticles}
          onDeleteArticle={articleDeletedHandler}
        />
      )}
    </React.Fragment>
  );
};

export default UserArticles;
