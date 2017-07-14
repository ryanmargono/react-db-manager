var Sequelize = require('sequelize');
var db = require('../index');

var School = db.define('school', {
    name: {type: Sequelize.STRING},
    image: {type: Sequelize.STRING},
    //students: {type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true}
},{
    timestamps: false,
})

module.exports = School;