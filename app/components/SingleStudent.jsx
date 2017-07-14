import React from 'react';
import { Link } from 'react-router-dom';

function SingleStudent({ studentObjList, studentId, schoolObjList, updateStudentThunk, deleteStudentThunk }) {

    const noSchoolString = 'No School'

    const student = studentObjList.filter(student => { return student.id == studentId })[0]

    const getSchool = (student) => {
        var matchedSchool = schoolObjList.filter(school => school.id == student.schoolId)
        return matchedSchool[0]
    }

    const submitUpdate = event => {
        event.preventDefault();
        const name = document.getElementById('nameFieldVal').value;
        const email = document.getElementById('emailFieldVal').value;
        const schoolId = document.getElementById('schoolFieldVal').value;
        const updatedStudent = { id: studentId, name, email, schoolId }
        updateStudentThunk(updatedStudent)
        window.location.reload();
    }

    const submitDelete = event => {
        console.log('clicked')
        deleteStudentThunk(student)
        window.location.reload();
    }


    return (
        <div>
            {student &&
                <div>
                    <div className="col-lg-6">
                    <form onSubmit={submitUpdate}>
                            <legend> Update Student </legend>
                            <div>
                                <label> Name </label>
                                <div>
                                    <input id='nameFieldVal' className="form-control" placeholder="Inert Name" />
                                </div>
                                <label> Email </label>
                                <div>
                                    <input id='emailFieldVal' className="form-control" placeholder="Insert Email" />
                                </div>
                                <label> School </label>
                                <div>
                                    <select id='schoolFieldVal'className="form-control" >
                                        {schoolObjList.map(school => {
                                            return (
                                                <option key={school.id} value={school.id}>{school.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <br></br>
                            <div>
                                <button type='submit' className="btn btn-primary"> Update </button>
                            </div>
                    </form>
                    </div>
                    
                    <div className='col-lg-6'>
                    <form onSubmit={submitDelete}>
                            <legend> Delete Student </legend>
                            <br/>
                            <div>
                                <button type='submit'className="btn btn-primary"> Delete </button>
                            </div>
                    </form>
                    </div>
                    
                    <div className='col-lg-12'>
                        <h1>{student.name} </h1>
                        <div> <b>Email:</b> {student.email} </div>
                        <div> <b>School: </b>
                            {student.schoolId && <Link to={`/schools/${getSchool(student).id}`}> {getSchool(student).name} </Link>} 
                            {!student.schoolId &&  noSchoolString }
                        </div>
                    </div>



                    

                </div>
            }
        </div>
    )
}

export default SingleStudent;