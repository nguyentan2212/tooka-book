import MockAdapter from "axios-mock-adapter";
import mockAuth from '../modules/auth/_mocks_/mockAuth'
import mockOrder from '../modules/orders/_mocks_/mockOrder';
export default function mockAxios(axios) {
    const mock = new MockAdapter(axios, { delayResponse: 300 });

    mockAuth(mock);
    mockOrder(mock);
    
    return mock;
}
  