import React, {Suspense} from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { ContentRoute } from "../template/layout/components/content/ContentRoute";
import { LayoutSplashScreen } from '../template/layout/core/MetronicSplashScreen';
import { MyPage } from "./modules/MyPage";

export default function BasePage() {
    return(
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                <Redirect exact from="/" to="/my-page" />
                <ContentRoute path="/my-page" component={MyPage}></ContentRoute>
        </Switch>
        </Suspense>
        );
}