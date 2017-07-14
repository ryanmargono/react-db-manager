import React from 'react'
import { Link } from 'react-router-dom';

function AllStudents({ studentObjList, schoolObjList, addStudentThunk }) {

    const compare = (a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    }

    const sortedStudentObjList = studentObjList.sort(compare);

    const submitForm = (event) => {
        event.preventDefault();
        const name = document.getElementById('nameFieldVal').value;
        const email = document.getElementById('emailFieldVal').value;
        const schoolId = document.getElementById('schoolFieldVal').value;
        const newStudent = { name, email, schoolId };
        console.log(newStudent)
        addStudentThunk(newStudent);
    }

    const getSchool = (student) => {
        var matchedSchool = schoolObjList.filter(school => school.id == student.schoolId)
        return matchedSchool[0]
    }

    return (
        <div>   
                <div>
                <form onSubmit={submitForm}>
                        <legend> Create New Student </legend>
                        <div>
                            <label> Name </label>
                            <div>
                                <input id='nameFieldVal'className="form-control" placeholder='Insert Name'/>
                            </div>
                            <label> Email </label>
                            <div>
                                <input id='emailFieldVal'className="form-control" placeholder='Insert Email' />
                            </div>
                            <label> School </label>
                            <div>
                                <select id='schoolFieldVal'className="form-control">
                                    {schoolObjList.map(school=>{
                                        return(
                                            <option key={school.id} value = {school.id}>{school.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <br></br>
                        <div>
                            <button type='submit' className="btn btn-primary"> Create </button>
                        </div>
                </form>
                <h1> All Students: </h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> Name </th>
                            <th> School </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            schoolObjList && sortedStudentObjList.map(student => {
                                return (
                                    <tr key={student.id}>
                                        <td> {student.id} </td>
                                        <td> <Link to={`/students/${student.id}`}>{student.name} </Link></td>
                                        { student.schoolId && <td> <Link to={`/schools/${getSchool(student).id}`} >{getSchool(student).name}</Link></td>}
                                        {!student.schoolId && <td> No School </td>}
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                </div>
        </div>
    )
}

export default AllStudents;