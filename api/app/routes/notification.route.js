const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/notification.controller')

router.post('/email', notificationController.email)
router.post('/whatsapp', notificationController.whatsapp)
router.post('/sms', notificationController.sms)

module.exports = router
