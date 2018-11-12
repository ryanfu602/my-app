import axios from "axios";


export function getCourses(){
    return new Promise((resolve, reject) => {
        axios
          .get("/api/courses")
          .then(response => {
            if (response.status >= 200 && response.status < 300) {
              resolve(response.data);
            } else {
              reject(response.response);
            }
          })
          .catch(reject);
      });

}


export function getCourseById( id){
    return new Promise((resolve, reject) => {
        axios
          .get(`/api/courses/${id}`)
          .then(response => {
            if (response.status >= 200 && response.status < 300) {
              resolve(response.data);
            } else {
              reject(response.response);
            }
          })
          .catch(reject);
      });

}