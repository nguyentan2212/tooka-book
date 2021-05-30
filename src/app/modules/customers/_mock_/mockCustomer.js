import customerTable from "./customerTable";
import { GET_ALL_CUSTOMERS_URL } from "../js/customer";

export default function mockCustomer(mock){
    mock.onGet(GET_ALL_CUSTOMERS_URL).reply(200, customerTable);
}