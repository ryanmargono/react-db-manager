import { combineReducers } from 'redux'
import schoolReducer from './schoolReducer';
import studentReducer from './studentReducer';

const rootReducer = combineReducers({
    school: schoolReducer, 
    student: studentReducer,
});

export default rootReducer;


