const express = require('express')
const models = require('../db/models/index')
const Student = models.Student;

const router = new express.Router();

router.get('/', function(req,res,next){
	Student.findAll({})
		.then(studentObjList => res.json(studentObjList)) 
		.catch(next)
})

router.get('/:id', (req,res,next)=>{
	Student.findById(req.params.id)
		.then(student => {
			if (!student) res.sendStatus(404)
			else res.json(student)
		})
		.catch(next)
})

router.post('/', (req,res,next)=>{
	Student.create(req.body)
		.then((newStudent)=> res.json(newStudent))
		.catch(next)
})

router.put('/:id', (req, res, next)=>{
	Student.update(req.body, {
		where: {id: req.params.id},
		returning: true
	})
		.then((updatedStudent)=>res.json(updatedStudent))
		.catch(next);
})

router.delete('/:id', (req, res, next)=>{
    Student.destroy({
        where: {id: req.params.id},
    })
        .then(() => res.sendStatus(200))
        .catch(next);
})

module.exports = router;