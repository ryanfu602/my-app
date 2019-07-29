import axios from "axios";


export function getLecturers( pageNumber, sortorder,sortstring ){
    return new Promise((resolve, reject) => {
        axios
          .get(`/api/Lecturer?pageNumber=${pageNumber}&sortOrder=${sortorder}&sortString=${sortstring}`)
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
          .get(`/api/Lecturer/${id}`)
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
        .post("/api/Lecturer",Lecturer)
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
        .put(`/api/Lecturer/${id}`,Lecturer)
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
        .delete(`/api/Lecturer/${id}`)
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



export function createLecturerCourse( lecturerCourse ){
  return new Promise((resolve, reject) => {
      axios
        .post("api/lecturer/createlecturercourse",lecturerCourse)
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



export function getLecturerCourse( lecturerId ){
  return new Promise((resolve, reject) => {
      axios
        .get(`api/lecturer/getlecturercourse?lecturerId=${lecturerId}`)
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


export function deleteLecturerCourse( lecturerId,courseId ){
  return new Promise((resolve, reject) => {
      axios
        .delete(`api/lecturer/deletelecturercourse?lecturerId=${lecturerId}&courseid=${courseId}`)
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

