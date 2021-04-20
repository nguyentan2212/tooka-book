import React, {useState} from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import BasePage from './BasePage';
import {AuthPage} from './modules/auth/pages/AuthPage';
import {Layout} from '../template/layout/components/Layout';
import useUser from './js/hooks/useUser';
import{ getToken, removeToken} from './js/utilities/token';
import Logout from './modules/auth/Logout';

export function Routes() {
    const { user, setUser } = useUser();
    
    console.log(user);
    return (
      <Switch>
        {/*Render auth page when user at `/auth` and not authorized.
           Otherwise redirect to root page (`/`)*/}
        {!user ? (<Route><AuthPage setUser={user => setUser(user)} /></Route>) : (<Redirect from="/auth" to="/" />)}
  
        <Route path="/logout" component={() => <Logout logout={removeToken}></Logout>} />

        {/* <Route path="/error" component={ErrorsPage} />
            <Route path="/logout" component={Logout} /> */}

        {/*Redirect to `/auth` when user is not authorized*/}
        {!user ? (<Redirect to="/auth/login" />) : (<Layout appuser={user}><BasePage /></Layout>)}
      </Switch>
    );
  }
  