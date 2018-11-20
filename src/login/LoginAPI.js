import axios from "axios";

function getToken(username, password) {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  params.append("grant_type", "password");

  return new Promise((resolve, reject) => {
    axios
      .post("/token", params)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          console.log( "response",response);
          reject(response.response);
        }
      })
      .catch(reject);
  });
}

export default getToken;
