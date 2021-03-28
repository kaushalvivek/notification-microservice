const notificationService = require('../services/notification.service')

exports.email = async function (req, res) {
  const data = req.body.data
  try {
    await notificationService.email(data)
    return res.status(201).json({ status: 201, message: 'Email queued successfully.' })
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message })
  }
}

exports.whatsapp = async function (req, res) {
  const data = req.body.data
  try {
    await notificationService.whatsapp(data)
    return res.status(201).json({ status: 201, message: 'whatsapp message queued successfully.' })
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message })
  }
}

exports.sms = async function (req, res) {
  const data = req.body.data
  try {
    await notificationService.sms(data)
    return res.status(201).json({ status: 201, message: 'SMS queued successfully.' })
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message })
  }
}
