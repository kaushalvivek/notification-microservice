require('dotenv').config()

exports.aws = {
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  queueUrls: {
    sms: process.env.SMS_QUEUE_URL,
    firebase: process.env.FIREBASE_QUEUE_URL,
    whatsapp: process.env.WHATSAPP_QUEUE_URL,
    email: process.env.EMAIL_QUEUE_URL
  }
}

exports.port = process.env.PORT
