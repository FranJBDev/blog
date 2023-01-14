const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const TOKEN_KEY = process.env.TOKEN_KEY

const createUser = async (data) => {
  // const date = new Date().toISOString().substring(0, 10)
  encryptedPass = await bcrypt.hash(data.pass, 10)
  const newUser = await userModel.create({
    user: data.user,
    pass: encryptedPass,
    // token: null,
  })

  return newUser
}

const findUser = (data, res) => {
  // create token
  const token = jwt.sign({ user: data.user }, TOKEN_KEY)

  try {
    userModel.findOne({ user: data.user }, (err, exists) => {
      if (err) return handleError(err)
      if (exists) {
        bcrypt.compare(data.pass, exists.pass, function (err, result) {
          if (err) return handleError(err)
          if (result) res.status(201).json({ token: token })
          else res.status(400).json({ message: 'Invalid credencials' })
        })
      } else res.status(400).json({ message: "User don't exists" })
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const registerUser = async (req, res) => {
  const { user, pass } = req.body
  const data = { user, pass }

  if (user && pass) {
    const exists = await userModel.findOne({ user: data.user })
    if (exists) {
      res.status(409).json({
        message: 'User ' + exists.user + ' Already Exist. Please Login',
      })
      return
    }

    const result = await createUser(data)
    res.status(201).json(result)
  } else {
    res.status(400).json({ message: 'Information is missing' })
  }
}

const loginUser = async (req, res) => {
  const { user, pass } = req.body
  const data = { user, pass }

  if (user && pass) {
    findUser(data, res)
  } else {
    res.status(400).json({ message: 'Please introduce user and pass' })
  }
}

const allUsers = (req, res) => {
  userModel.find({}, (err, result) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(result)
    }
  })
}

module.exports = {
  registerUser,
  loginUser,
  allUsers,
}
