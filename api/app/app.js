const express = require('express')
const app = express()
const BodyParser = require('body-parser')
const notificationRoutes = require('./routes/notification.route')

// parse application/json
app.use(BodyParser.json())

app.use('/api/v1/notify', notificationRoutes)

app.get('/health', (req, res) => {
  res.send({ status: 'OK' })
})

module.exports = app
