import React, {Suspense} from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen } from '../template/layout/core/MetronicSplashScreen';
import Dashboard from "./modules/dashboard/Dashboard";
import OrderManagePage from "./modules/orders/pages/OrderManagePage";
import NewOrderPage from './modules/orders/pages/NewOrderPage';
import CategoryPage from './modules/categories/pages/CategoryPage';
import AuthorPage from './modules/authors/pages/AuthorPage';
import CustomerPage from './modules/customers/pages/CustomerPage';
import BookManagerPage from "./modules/books/pages/BookManagerPage";
import InventoryReport from "./modules/reports/pages/InventoryReport";
import RevenueReport from "./modules/reports/pages/RevenueReport";
import EmployeePage from "./modules/employee/pages/EmployeePage";
import RulesPage from "./modules/rules/pages/RulesPage";
import ImportBookList from "./modules/importBooks/pages/ImportBookList";
import ImportBook from "./modules/importBooks/pages/ImportBook";

export default function BasePage() {
    return(
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                <Redirect exact from="/" to="/dashboard" />
                <Route path="/dashboard" component={Dashboard}></Route>
                <Route path="/quanlyhoadon/banhang" component={OrderManagePage}></Route>
                <Route path="/quanlyhoadon/nhaphang" component={ImportBookList}></Route>
                <Route path="/banhang" component={NewOrderPage}></Route>
                <Route path="/nhaphang" component={ImportBook}></Route>
                <Route path="/quanlysach/theloai" component={CategoryPage}></Route>
                <Route path="/quanlysach/tacgia" component={AuthorPage}></Route>
                <Route path="/khach" component={CustomerPage}></Route>
                <Route path="/quanlysach/sach" component={BookManagerPage}></Route>
                <Route path="/baocao/tonkho" component={InventoryReport}></Route>
                <Route path="/baocao/doanhthu" component={RevenueReport}></Route>
                <Route path="/quanlynhanvien" component={EmployeePage}></Route>
                <Route path="/rules" component={RulesPage}></Route>
        </Switch>
        </Suspense>
        );
}