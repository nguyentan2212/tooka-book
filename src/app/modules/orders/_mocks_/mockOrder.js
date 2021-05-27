import orderTableMock from "./orderTableMock";
import {GET_ALL_ORDER_URL} from "../js/order";

export default function mockOrder(mock){
    mock.onGet(GET_ALL_ORDER_URL).reply(200, orderTableMock);
}

