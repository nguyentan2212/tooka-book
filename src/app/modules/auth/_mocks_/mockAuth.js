import userTableMock from "./userTableMock";
import {
    LOGIN_URL,
    REGISTER_URL
} from '../js/auth';

export default function mockAuth(mock) {
    mock.onPost(LOGIN_URL).reply(({ data }) => {
      const { email, password } = JSON.parse(data);
  
      if (email && password) {
        const user = userTableMock.find(
          x =>
            x.email.toLowerCase() === email.toLowerCase() &&
            x.password === password
        );
  
        if (user) {
          let result = {
            data: { ...user, password: undefined }
          }
          return result;
        }
      } 
      return [400];
    });
  
    mock.onPost(REGISTER_URL).reply(({ data }) => {
      const { email, fullname, username, password } = JSON.parse(data);
  
      if (email && fullname && username && password) {
        const user = {
          id: generateUserId(),
          email,
          username,
          password,
          accessToken: "access-token-" + Math.random()
        };
  
        userTableMock.push(user);
  
        return [200, { ...user, password: undefined }];
      }
  
      return [400];
    });
}

    function generateUserId() {
        const ids = userTableMock.map(el => el.id);
        const maxId = Math.max(...ids);
        return maxId + 1;
    }