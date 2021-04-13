import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import BasePage from './BasePage';
import {AuthPage} from './pages/auth/AuthPage';

export function Routes() {
    const isAuthorized = null;
    console.log(isAuthorized);
    return (
      <Switch>
        {!isAuthorized ? (
          /*Render auth page when user at `/auth` and not authorized.*/
          <Route>
            <AuthPage />
          </Route>
        ) : (
          /*Otherwise redirect to root page (`/`)*/
          <Redirect from="/auth" to="/" />
        )}
  
        {/* <Route path="/error" component={ErrorsPage} />
        <Route path="/logout" component={Logout} /> */}
  
        {!isAuthorized ? (
          /*Redirect to `/auth` when user is not authorized*/
          <Redirect to="/auth/login" />
        ) : (<BasePage />)}
      </Switch>
    );
  }
  