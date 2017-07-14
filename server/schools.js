const express = require('express')
const models = require('../db/models/index')
const School = models.School;

const router = new express.Router();

router.get('/', function(req,res,next){
	School.findAll({})
		.then(schoolsObjList => res.json(schoolsObjList))
		.catch(next)
})

router.get('/:id', function(req,res,next){
	School.findById(req.params.id)
		.then(school => {
			if (!school) res.sendStatus(404)
			else res.json(school)
		})
		.catch(next)
})

router.post('/', (req,res,next)=>{
	School.create(req.body)
		.then((newSchool) => res.json(newSchool))
		.catch (next)
})

router.put('/:id', (req, res, next)=>{
	School.update(req.body, {
		where: {id: req.params.id},
		returning: true
	})
		.then((updatedSchool)=>res.json(updatedSchool))
		.catch(next);
})

router.delete('/:id', (req, res, next)=>{
    School.destroy({
        where: {id: req.params.id},
    })
        .then(() => res.sendStatus(200))
        .catch(next);
})

module.exports = router;