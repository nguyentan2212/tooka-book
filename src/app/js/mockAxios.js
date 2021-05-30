import MockAdapter from "axios-mock-adapter";
import mockAuth from '../modules/auth/_mocks_/mockAuth'
import mockOrder from '../modules/orders/_mocks_/mockOrder';
import mockBook from '../modules/books/_mock_/mockBook';
import mockAuthor from '../modules/authors/_mock_/mockAuthor';

export default function mockAxios(axios) {
    const mock = new MockAdapter(axios, { delayResponse: 300 });

    mockAuth(mock);
    mockOrder(mock);
    mockBook(mock);
    mockAuthor(mock);

    return mock;
}
  