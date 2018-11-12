const API_URL="https://lms1210.azurewebsites.net";
const HOST_URL="http://localhost:3000"
export function getApiUrl() {
    return API_URL || process.env.API_URL;
  }


  export function redirect(path) {
    const hostUrl = HOST_URL || process.env.HOST_URL;
    window.location.href = `${hostUrl}#${path}`;
  }
  


  