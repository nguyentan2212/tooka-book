export function saveToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
  }
  
export function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}