import axios from 'axios';

//action type
const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS'
const PUT_NEW_STUDENT = 'PUT_NEW_STUDENT'
const UPDATE_STUDENT = 'UPDATE_STUDENT'
const DELETE_STUDENT = 'DELTE_STUDENT'

//action creator
export const getAllStudents = (studentObjList) => {
    const newAction = {};
    newAction.type = GET_ALL_STUDENTS;
    newAction.studentObjList= studentObjList;
    return newAction;
}

export const makeNewStudent = (studentObj) => {
    const newAction = {};
    newAction.type = PUT_NEW_STUDENT;
    newAction.studentObj = studentObj;
    return newAction;
}

export const updateStudent = studentObj => {
    const newAction = {};
    newAction.studentObj = studentObj;
    newAction.type = UPDATE_STUDENT
    return newAction;
}

export const deleteStudent = studentObj => {
    const newAction = {};
    newAction.type = DELETE_STUDENT;
    newAction.studentObj = studentObj;
    return newAction;
}

//thunk creator
export function fetchAllStudents () {
    return function (dispatch) {
        axios.get('/api/students')
            .then(res=>res.data)
            .then(studentObjList => dispatch(getAllStudents(studentObjList)))
    }
}

export function addStudent(studentObj){
    return function (dispatch){
        axios.post('/api/students', studentObj)
        .then(res=>res.data)
        .then(newStudentObj => dispatch(makeNewStudent(newStudentObj)))
    }
}

export function putUpdateStudent(studentObj){
    const url = '/api/students/' + studentObj.id.toString();
    return function(dispatch){
        axios.put(url, studentObj)
            .then(res=>res.data)
            .then(updatedStudent => dispatch(updateStudent(updatedStudent)))
    }
}

export function deleteStudentReq(studentObj){
    const url = '/api/students/' + studentObj.id.toString();
    return function(dispatch){
        axios.delete(url)
            .then(() => dispatch(deleteStudent(studentObj)))
    }
}



//reducer
export default function studentReducer (students=[], action){
    switch(action.type){
        case GET_ALL_STUDENTS:
            return action.studentObjList
        case PUT_NEW_STUDENT:
            return students.concat([action.studentObj])
        case UPDATE_STUDENT:
            const updatedStudent = action.studentObj;
            const indexOfOldStudent = students.indexOf(updatedStudent.id)
            return students[indexOfOldStudent] = updatedStudent;
        default:
            return students;
    }
}


