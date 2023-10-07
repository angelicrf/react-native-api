const express = require('express')

const { postStripeData } = require('./stripeFuncs')

const router = express.Router()

router.get('/', (req, res) => res.status(200).json({ msg: 'server' }))

router.post('/userStripeData', postStripeData)

router.get('/getUserData', (req, res, next) => {
  res.status(200).json({ message: 'here is your public resource' })
})

module.exports = router
