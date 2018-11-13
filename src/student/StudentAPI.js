import axios from "axios";


export function getStudents( pageNumber ){
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/students?pageNumber=${pageNumber}`)
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


export function getStudentById( id){
    return new Promise((resolve, reject) => {
        axios
          .get(`/api/Students/${id}`)
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

export function createStudent(Student ){
  return new Promise((resolve, reject) => {
      axios
        .post("/api/Students",Student)
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



export function updateStudent(Student,id ){
  return new Promise((resolve, reject) => {
      axios
        .put(`/api/Students/${id}`,Student)
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




export function deleteStudent( id ){
  return new Promise((resolve, reject) => {
      axios
        .delete(`/api/Students/${id}`)
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

