import React, {Suspense} from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { ContentRoute } from "../template/layout/components/content/ContentRoute";
import { LayoutSplashScreen } from '../template/layout/core/MetronicSplashScreen';
import Dashboard from "./modules/dashboard/Dashboard";
import OrderManagePage from "./modules/orders/pages/OrderManagePage";

export default function BasePage() {
    return(
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                <Redirect exact from="/" to="/dashboard" />
                <ContentRoute path="/dashboard" component={Dashboard}></ContentRoute>
                <ContentRoute path="/quanlyhoadon" component={OrderManagePage}></ContentRoute>
        </Switch>
        </Suspense>
        );
}