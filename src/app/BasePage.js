import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { ContentRoute } from "../template/layout/components/content/ContentRoute";
import { MyPage } from "./pages/MyPage";

export default function BasePage() {
    return(
        <Switch>
            <ContentRoute path="/my-page" component={MyPage}></ContentRoute>
        </Switch>
        );
}