import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});

/*
try {
      console.log('hello');
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('content', formState.inputs.content.value);
      formData.append('creator', auth.userId);
      await sendRequest(
        'http://localhost:5000/api/articles',
        'POST',
        formData,
        { Authorization: 'Bearer ' + auth.token }
      );
      history.push('/');
    } 


*/

/*

 try {
      console.log(
        JSON.stringify({
          title: formState.inputs.title.value,
          content: formState.inputs.content.value,
          creator: auth.userId,
        })
      );
      await sendRequest(
        'http://localhost:5000/api/articles',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          content: formState.inputs.content.value,
          creator: auth.userId,
        }),
        { Authorization: 'Bearer ' + auth.token },
        { 'Content-Type': 'application/json' }
      );
      history.push('/');
    } 
*/
