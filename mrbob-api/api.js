'use strict'

const debug = require('debug')('mrbob:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const db = require('mrbob-db')
const config = require('./config')

const api = asyncify(express.Router())

let services, Register, Login, Header

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }
    debug('Connecting to database succesful')
    
    Register = services.Register
		Login = services.Login
		Header = services.Header
  }
  next()
})

module.exports = api