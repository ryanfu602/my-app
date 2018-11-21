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




export function createStudentCourse(StudentCourse ){
  return new Promise((resolve, reject) => {
      axios
        .post("/api/student/createstudentcourse",StudentCourse)
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

export function getStudentCourses(id ){

  console.log("id=",id);
  return new Promise((resolve, reject) => {
      axios
        .get(`/api/student/getstudentcourse?studentid=${id}&type="StudentCourse"`,)
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

export function deleteStudentCourses(id ){

  console.log("id=",id);
  return new Promise((resolve, reject) => {
      axios
        .delete(`/api/student/getstudentcourse?id=${id}&type="StudentCourse"`,)
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