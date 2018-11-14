import axios from "axios";


export function getLecturers(){
    return new Promise((resolve, reject) => {
        axios
          .get("/api/Lecturers")
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


export function getLecturerById( id){
    return new Promise((resolve, reject) => {
        axios
          .get(`/api/Lecturers/${id}`)
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

export function createLecturer(Lecturer ){
  return new Promise((resolve, reject) => {
      axios
        .post("/api/Lecturers",Lecturer)
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



export function updateLecturer(Lecturer,id ){
  return new Promise((resolve, reject) => {
      axios
        .put(`/api/Lecturers/${id}`,Lecturer)
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




export function deleteLecturer( id ){
  return new Promise((resolve, reject) => {
      axios
        .delete(`/api/Lecturers/${id}`)
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

