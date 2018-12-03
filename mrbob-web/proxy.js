'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const multer = require('multer')
const ext = require('file-extension')
const request = require('request-promise-native')
const passport = require('passport')

require('./config/passport')(passport)

const api = asyncify(express.Router())

module.exports = api