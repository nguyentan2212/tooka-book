import React, {Suspense} from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { ContentRoute } from "../template/layout/components/content/ContentRoute";
import { LayoutSplashScreen } from '../template/layout/core/MetronicSplashScreen';
import Dashboard from "./modules/dashboard/Dashboard";
import OrderManagePage from "./modules/orders/pages/OrderManagePage";
import NewOrderPage from './modules/orders/pages/NewOrderPage';
import Categories from './modules/categories/pages/Categories';
import AuthorPage from './modules/authors/pages/AuthorPage';
import CustomerPage from './modules/customers/pages/CustomerPage';
import BookManagerPage from "./modules/books/pages/BookManagerPage";

export default function BasePage() {
    return(
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                <Redirect exact from="/" to="/dashboard" />
                <ContentRoute path="/dashboard" component={Dashboard}></ContentRoute>
                <ContentRoute path="/quanlyhoadon" component={OrderManagePage}></ContentRoute>
                <ContentRoute path="/banhang" component={NewOrderPage}></ContentRoute>
                <ContentRoute path="/quanlykho/theloai" component={Categories}></ContentRoute>
                <ContentRoute path="/quanlykho/tacgia" component={AuthorPage}></ContentRoute>
                <Route path="/khach" component={CustomerPage}></Route>
                <Route path="/quanlykho/sach" component={BookManagerPage}></Route>
        </Switch>
        </Suspense>
        );
}