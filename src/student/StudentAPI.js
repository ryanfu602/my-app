import axios from "axios";


export function getStudents( pageNumber, sortorder,sortstring ){
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/student?pageNumber=${pageNumber}&sortOrder=${sortorder}&sortString=${sortstring}`)
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
          .get(`/api/Student/${id}`)
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
        .post("/api/Student",Student)
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
        .put(`/api/Student/${id}`,Student)
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
        .delete(`/api/Student/${id}`)
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

