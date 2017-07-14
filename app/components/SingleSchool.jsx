import React from 'react';
import { Link } from 'react-router-dom';

function SingleSchool({ schoolObjList, studentObjList, schoolId, updateSchoolThunk, deleteSchoolThunk, addStudentThunk }) {

    const matchedStudents = studentObjList.filter(student => { return student.schoolId == schoolId })

    const matchedSchoolArr = schoolObjList.filter(school => { return school.id == schoolId })
    const matchedSchool = matchedSchoolArr[0];

    const submitUpdate = event => {
        event.preventDefault();
        const name = document.getElementById('nameFieldVal').value;
        const image = document.getElementById('imageFieldVal').value;
        const updatedSchool = { id: schoolId, name, image }
        updateSchoolThunk(updatedSchool)
        window.location.reload()
    }

    const submitDelete = event => {
        event.preventDefault();
        deleteSchoolThunk(matchedSchool)
        window.location.reload()
    }

    const submitStudent = event => {
        console.log('clicked')
        event.preventDefault();
        const newStudentName = document.getElementById('schoolNameFieldVal').value;
        const newStudentEmail = document.getElementById('schoolEmailFieldVal').value;
        const newStudent = {name: newStudentName, email: newStudentEmail, schoolId: schoolId}
        addStudentThunk(newStudent)
    }

    return (
        <div>
           
            <div className='col-lg-4'>
                <form onSubmit={submitStudent}>
                    <legend> Add Student </legend>
                    <div>
                        <label> Name </label>
                        <div>
                            <input id='schoolNameFieldVal' className="form-control" placeholder='Insert Name' />
                        </div>
                        <label> Email </label>
                        <div>
                            <input id='schoolEmailFieldVal' className="form-control" placeholder='Insert Email' />
                        </div>
                    </div>
                    <br></br>
                    <div>
                        <button type='submit' className="btn btn-primary"> Add </button>
                    </div>
                </form>
            </div>
            
            <div className='col-lg-4'>
                <form onSubmit={submitUpdate}>
                    <fieldset>
                        <legend> Update School</legend>
                        <div>
                            <label> Name </label>
                            <div>
                                <input id='nameFieldVal' className="form-control" placeholder="Inert Name" />
                            </div>
                            <label> Image </label>
                            <div>
                                <input id='imageFieldVal' className="form-control" placeholder="Insert IMG URL" />
                            </div>
                        </div>
                        <br />
                        <div>
                            <button type='submit' className="btn btn-primary">  Update </button>
                        </div>
                    </fieldset>
                </form>
            </div>

            <div className='col-lg-4'>
                <form onSubmit={submitDelete}>
                    <fieldset>
                        <legend> Delete School </legend>
                        <br />
                        <div>
                            <button type='submit' className="btn btn-primary"> Delete </button>
                        </div>
                    </fieldset>
                </form>
            </div>

            <div className="col-lg-12">
                <div className='col-lg-4'>
                {matchedSchool && 
                <div>
                <h1>{matchedSchool.name}</h1>
                <div> <img height='400' width='400'src={matchedSchool.image}/> </div>
                </div>
                }
                </div>
                
                <div className='col-lg-8'>
                <h3> Students: </h3>
                <ul>
                    {
                        matchedStudents.map(student => {
                            return (
                                <li key={student.id}>
                                    <Link to={`/students/${student.id}`}>{student.name} </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                </div>
            </div>


        </div>
    )
}

export default SingleSchool;