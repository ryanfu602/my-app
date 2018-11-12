const API_URL=JSON.stringify("https://lms1210.azurewebsites.net");
const HOST_URL=JSON.stringify("http://localhost:8080");
export function getApiUrl() {
    return API_URL || process.env.API_URL;
  }


  export function redirect(path) {
    const hostUrl = HOST_URL || process.env.HOST_URL;
    window.location.href = `${hostUrl}#${path}`;
  }
  