'use strict'

const http = require('http')
const path = require('path')
const express = require('express')
const asyncify = require('express-asyncify')
const bodyParser = require('body-parser')
const debug = require('debug')('mrbob:web')
const chalk = require('chalk')
const history = require('connect-history-api-fallback')
const flash    = require('connect-flash')
const session      = require('express-session')
const passport = require('passport')
const proxy = require('./proxy')

const app = asyncify(express())
const port = process.env.PORT || 8080
const server = http.createServer(app)
app.use(history())
app.use(express.static(path.join(__dirname, 'views/public')))
app.use('/bulma', express.static(path.join(__dirname, 'node_modules/bulma/css')))
app.use(bodyParser.json({limit: "100mb", type:'application/json'}))
app.use(bodyParser.urlencoded({limit: "100mb", extended: false, parameterLimit:52428800}))
app.use(session({ secret: 'mrbob2019' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use('/', proxy)

app.use((err, req, res, next) => {
  debug(`Error ${err.message}`)
  if (err.message.match(/not found/)) {
    return res.status(404).send({error: err.message})
  }
  console.log("MENSAJE DE ERROR---->", err.message)
  res.status(500).send({error: err.message})
})

function handleFatalError (err) {
  console.log(`${chalk.red('[fatal error]')} ${err.message}`)
  console.log(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
  console.log(`$${chalk.green('[mrbob-web]')} server listening on port 8080`)
})