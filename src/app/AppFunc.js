const API_URL="https://lms20181123125515.azurewebsites.net";
const HOST_URL="http://react-lms.s3-website-ap-southeast-2.amazonaws.com"
// const API_URL="https://http://localhost:51194/";
// const HOST_URL="http://localhost:3000/"
export function getApiUrl() {
    return API_URL || process.env.API_URL;
  }


  export function redirect(path) {
    const hostUrl = HOST_URL || process.env.HOST_URL;
    window.location.href = `${hostUrl}#${path}`;
  }
  

  export function getValidationErrors(err) {
    const validationErrors = err.inner.reduce((x, y) => {
      x[y.path] = y.message;
      return x;
    }, {});
    return validationErrors;
  }

  