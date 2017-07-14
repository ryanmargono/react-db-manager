import axios from 'axios';

//action type
const GET_ALL_SCHOOLS = 'GET_ALL_SCHOOLS'
const PUT_NEW_SCHOOL = 'PUT_NEW_SCHOOL'
const UPDATE_SCHOOL = 'UPDATE_SCHOOl'
const DELETE_SCHOOL = 'DELTE_STUDENT'

//action creator
export const getAllSchools = (schoolObjList) => {
    const newAction = {};
    newAction.type = GET_ALL_SCHOOLS;
    newAction.schoolObjList = schoolObjList;
    return newAction;
}

export const makeNewSchool = (schoolObj) => {
    const newAction = {};
    newAction.schoolObj = schoolObj;
    newAction.type = PUT_NEW_SCHOOL;
    return newAction
}

export const updateSchool = (schoolObj) => {
    const newAction = {};
    newAction.schoolObj = schoolObj;
    newAction.type = UPDATE_SCHOOL;
    return newAction
}

export const deleteSchool= schoolObj => {
    const newAction = {};
    newAction.type = DELETE_SCHOOL;
    newAction.schoolObj = schoolObj;
    return newAction;
}

//thunk creator
export function fetchAllSchools(){
    return function (dispatch){
        axios.get('/api/schools')
            .then(res => res.data)
            .then(schoolObjList => dispatch(getAllSchools(schoolObjList)))
    }
}

export function addSchool(schoolObj){
    return function (dispatch){
        axios.post('/api/schools', schoolObj)
            .then(res=>res.data)
            .then((newSchoolObj)=>dispatch(makeNewSchool(newSchoolObj)))
    }
} 

export function putUpdateSchool(schoolObj){
    const url = '/api/schools/'+ schoolObj.id.toString();
    return function (dispatch){
        axios.put(url, schoolObj)
            .then(res=>res.data)
            .then(updatedSchool => dispatch(updateSchool(updatedSchool)))
    }
}

export function deleteSchoolReq(schoolObj){
    const url = '/api/schools/' + schoolObj.id.toString();
    return function(dispatch){
        axios.delete(url)
            .then(() => dispatch(deleteSchool(schoolObj)))
    }
}

//reducer
export default function schoolReducer (schools = [], action) {
    
    switch (action.type) {
        case GET_ALL_SCHOOLS:
            return action.schoolObjList;
        case PUT_NEW_SCHOOL:
            return schools.concat([action.schoolObj]);
        case UPDATE_SCHOOL:
            const updatedSchool = action.schoolObj;
            const indexOfOldSchool = schools.indexOf(updatedSchool.id);
            return schools[indexOfOldSchool] = updatedSchool;
        default:
            return schools
    }
}

