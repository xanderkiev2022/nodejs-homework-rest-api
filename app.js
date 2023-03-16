const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { errorHandler } = require("./src/helpers/apiHelpers");

const contactsRouter = require('./routes/api/contacts')
const { authRouter } = require('./routes/api/authRouter');
// TODO authRouter rename

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use(errorHandler);


module.exports = app
