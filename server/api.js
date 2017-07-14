'use strict'
const api = require('express').Router()

module.exports = api

api.use('/students', require('./students'))
api.use('/schools', require('./schools'));


