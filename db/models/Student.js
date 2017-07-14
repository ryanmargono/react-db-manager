var Sequelize = require('sequelize');
var db = require('../index');

var Student = db.define('student',{
    name: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING},
    //school: {type: Sequelize.STRING, allowNull: false},
},{
    timestamps: false,
})

module.exports = Student;