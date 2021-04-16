import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import BasePage from './BasePage';
import {AuthPage} from './pages/auth/AuthPage';
import {Layout} from '../template/layout/components/Layout';

export function Routes() {
    const isAuthorized = "null";
    console.log(isAuthorized);
    return (
      <Switch>
        {/*Render auth page when user at `/auth` and not authorized.
           Otherwise redirect to root page (`/`)*/}
        {!isAuthorized ? (<Route><AuthPage /></Route>) : (<Redirect from="/auth" to="/" />)}
  
        

        {/* <Route path="/error" component={ErrorsPage} />
            <Route path="/logout" component={Logout} /> */}

        {/*Redirect to `/auth` when user is not authorized*/}
        {!isAuthorized ? (<Redirect to="/auth/login" />) : (<Layout><BasePage /></Layout>)}
      </Switch>
    );
  }
  