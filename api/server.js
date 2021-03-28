const dotenv = require('dotenv')
dotenv.config()

const app = require('./app/app')
const config = require('./config')

const port = config.port || 2221
app.set('port', port)

app.listen(app.get('port'), () => {
  console.log('Express server started and running at', port)
})
