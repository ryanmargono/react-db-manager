'use strict';

var Student = require('./Student');
var School = require('./School'); 

Student.belongsTo(School)


module.exports = {Student, School}
