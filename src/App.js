import React, { useState, useCallback, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

//import Users from './user/pages/Users';
//import NewArticle from './articles/pages/NewArticle';
//import UserArticles from './articles/pages/UserArticles';
//import UpdateArticle from './articles/pages/UpdateArticle';
//import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const Users = React.lazy(() => import('./user/pages/Users'));
const NewArticle = React.lazy(() => import('./articles/pages/NewArticle'));
const UserArticles = React.lazy(() => import('./articles/pages/UserArticles'));
const UpdateArticle = React.lazy(() =>
  import('./articles/pages/UpdateArticle')
);
const Auth = React.lazy(() => import('./user/pages/Auth'));

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/articles' exact>
          <UserArticles />
        </Route>
        <Route path='/articles/new' exact>
          <NewArticle />
        </Route>
        <Route path='/articles/:articleId'>
          <UpdateArticle />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/places' exact>
          <UserArticles />
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className='center'>
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
