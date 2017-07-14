import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import AllSchools from './AllSchools'
import AllStudents from './AllStudents'
import store from '../store'
import SingleSchool from './SingleSchool'
import SingleStudent from './SingleStudent'

import { fetchAllSchools, addSchool, putUpdateSchool, deleteSchoolReq } from '../reducers/schoolReducer'
import { fetchAllStudents, addStudent, putUpdateStudent, deleteStudentReq } from '../reducers/studentReducer'

class Home extends Component {

  
  
  componentDidMount() {
    this.props.loadAllSchools();
    this.props.loadAllStudents();
  }

  render() {
    
    console.log(this.props.Router)

    const bool = false;
    
    const schoolObjList = this.props.schools;
    const addSchoolThunk = this.props.addSchool;
    const updateSchoolThunk = this.props.updateSchool;
    const deleteSchoolThunk = this.props.deleteSchool;

    const studentObjList = this.props.students;
    const addStudentThunk = this.props.addStudent;
    const updateStudentThunk = this.props.updateStudent;
    const deleteStudentThunk = this.props.deleteStudent;

    return (
      <Router>
        <div className='app'>

          <nav className="navbar navbar-light">
            <Link to="/" className='navbar-brand'> Schools </Link>
            <Link to="/students" className='navbar-brand'> Students </Link>
          </nav>
          

          <div className='container-fluid'>
            {
              schoolObjList &&
              (<Switch>
                <Route exact path='/' render={() =>
                  <AllSchools 
                  schoolObjList={schoolObjList} 
                  addSchoolThunk={addSchoolThunk}
                  bool={bool}/>}
                />
                <Route exact path='/students' render={() =>
                  <AllStudents 
                  studentObjList={studentObjList} 
                  schoolObjList={schoolObjList}
                  addStudentThunk={addStudentThunk}/>}
                />
                <Route path='/schools/:schoolId' render={({match}) =>
                  <SingleSchool 
                    schoolObjList = {schoolObjList}
                    studentObjList={studentObjList} 
                    schoolId = {match.params.schoolId}
                    updateSchoolThunk={updateSchoolThunk}
                    deleteSchoolThunk={deleteSchoolThunk}
                    addStudentThunk={addStudentThunk}/>}
                />
                <Route path='/students/:studentId' render={({match})=>
                  <SingleStudent 
                    schoolObjList={schoolObjList}
                    studentObjList={studentObjList}
                    studentId={match.params.studentId}
                    updateStudentThunk={updateStudentThunk}
                    deleteStudentThunk={deleteStudentThunk}/>}
                />
              </Switch>)
            }
          </div>

        </div>
      </Router>
    )
  }
}

const mapStateToProps = storeState => ({
  schools: storeState.school,
  students: storeState.student,
})

const mapDispatchToProps = dispatch => ({
  loadAllSchools: () => dispatch(fetchAllSchools()),
  addSchool: (newSchoolObj) => dispatch(addSchool(newSchoolObj)),
  updateSchool: (schoolObj) => dispatch(putUpdateSchool(schoolObj)),
  deleteSchool: (schoolObj) => dispatch(deleteSchoolReq(schoolObj)),
  
  loadAllStudents: () => dispatch(fetchAllStudents()),
  addStudent: (newStudentObj) => dispatch(addStudent(newStudentObj)),
  updateStudent: (studentObj) => dispatch(putUpdateStudent(studentObj)),
  deleteStudent: (studentObj) => dispatch(deleteStudentReq(studentObj)),
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)