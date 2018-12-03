'use strict'

const debug = require('debug')('mrbob:api')
const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const bodyParser = require('body-parser')
const chalk = require('chalk')

const api = require('./api')

const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)

app.use(bodyParser.json({limit: "100mb", type:'application/json'}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}));
app.use('/api', api) // api v1.0

// express error handler
app.use((err, req, res, next) => {
  debug(`Error ${err.message}`)
  if (err.message.match(/not found/)) {
    return res.status(404).send({error: err.message})
  }
  console.log(err.message)

  res.status(500).send({error: err.message})
})

function handleFatalError (err) {
  console.log(`${chalk.red('[fatal error]')} ${err.message}`)
  console.log(err.stack)
  process.exit(1)
}

if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  server.listen(port, () => console.log(`${chalk.green('[mrbob-api]')} server listening on port ${port}`))
}

module.exports = server