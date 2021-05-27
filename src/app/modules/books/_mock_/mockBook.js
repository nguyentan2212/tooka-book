import bookTable from './bookTable';
import {GET_ALL_BOOKS_URL} from '../js/book';

export default function mockBook(mock){
    mock.onGet(GET_ALL_BOOKS_URL).reply(200, bookTable);
}