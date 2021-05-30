import authorTable from './authorTable';
import {GET_ALL_AUTHORS_URL} from '../js/author';

export default function mockAuthor(mock){
    mock.onGet(GET_ALL_AUTHORS_URL).reply(200, authorTable);
}