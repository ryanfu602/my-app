import axios from "axios";


export function getCourses(){
    return new Promise((resolve, reject) => {
        axios
          .get("/api/course")
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
          .get(`/api/course/${id}`)
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

export function createCourse(course ){
  return new Promise((resolve, reject) => {
      axios
        .post("/api/course",course)
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



export function updateCourse(course,id ){
  return new Promise((resolve, reject) => {
      axios
        .put(`/api/course/${id}`,course)
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




export function deleteCourse( id ){
  return new Promise((resolve, reject) => {
      axios
        .delete(`/api/course/${id}`)
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

