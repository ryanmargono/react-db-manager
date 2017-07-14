import React from 'react';
import { Link } from 'react-router-dom';



class AllSchools extends React.Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }
    submitForm(event) {
        const { addSchoolThunk } = this.props;
        event.preventDefault();
        const nameFieldVal = document.getElementById('nameFieldVal').value;
        const imageFieldVal = document.getElementById('imageFieldVal').value;
        const newSchool = { name: nameFieldVal, image: imageFieldVal };
        addSchoolThunk(newSchool);
    }
    render() {
        const { schoolObjList } = this.props;
        const compare = (a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
        }

        const sortedSchoolObjList = schoolObjList.sort(compare);

        return (
            <div>
                <form onSubmit={this.submitForm}>
                    <legend> Create New School </legend>
                    <div className = "form-group">
                        <label> Name </label>
                        <div>
                            <input id='nameFieldVal' placeholder="Enter Name" className="form-control"/>
                        </div>
                        <label> Image </label>
                        <div>
                            <input id='imageFieldVal' placeholder="Enter IMG URL" className="form-control"/>
                        </div>
                    </div>
                    <div>
                        <button type='submit' className="btn btn-primary"> Create </button>
                    </div>
                </form>

                <h1> All Schools: </h1>
                    <div className='row'>
                    {
                    
                        sortedSchoolObjList.map(school => {
                            if (school.name !== "No School")
                            return (
                                <div className = 'col-lg-4' key={school.id}>
                                    <Link to={`/schools/${school.id}`}>
                                    <img height='400' width='400' src={school.image}/>
                                    <br/>
                                    {school.name}
                                    <br/>
                                    <br/>
                                    </Link>
                                </div>
                            )
                        })
                        
                    }
                    </div>


            </div>

        )
    }
}




export default AllSchools;

