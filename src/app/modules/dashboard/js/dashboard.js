import moment from "moment";
import { getAllBooks } from "../../books/js/book";
import { getAllEmployees } from "../../employee/js/employee";
import { getAllOrders } from "../../orders/js/order";
import { getRevenueReport } from "../../reports/js/report";

export const getOverviewInfo = async () => {
  const bookNumber = await getAllBooks().then((books) => books.length);
  const employeeNumber = await getAllEmployees().then((employees) => employees.length);
  const { billNumber, revenue } = await getAllOrders().then((bills) => {
    let billNumber = bills.length;
    let revenue = bills.reduce((total, bill) => {
      return total + bill.total;
    }, 0);
    return { billNumber, revenue };
  });
  return { bookNumber, employeeNumber, billNumber, revenue };
};