import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './ArticleForm.css';

const UpdateArticle = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedArticle, setLoadedArticle] = useState();
  const articleId = useParams().articleId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      content: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/articles/${articleId}`
        );
        setLoadedArticle(responseData.article);
        setFormData(
          {
            title: {
              value: responseData.article.title,
              isValid: true,
            },
            content: {
              value: responseData.article.content,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchArticle();
  }, [sendRequest, articleId, setFormData]);

  const articleUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/articles/${articleId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          content: formState.inputs.content.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      history.push('/' + auth.userId + '/articles');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedArticle && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find article!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedArticle && (
        <form className='article-form' onSubmit={articleUpdateSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title.'
            onInput={inputHandler}
            initialValue={loadedArticle.title}
            initialValid={true}
          />
          <Input
            id='content'
            element='textarea'
            label='Content'
            validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(500)]}
            errorText='Please enter valid content (min. 5 characters).'
            onInput={inputHandler}
            initialValue={loadedArticle.content}
            initialValid={true}
          />
          <Button type='submit' disabled={!formState.isValid}>
            UPDATE ARTICLE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateArticle;
