const express = require("express")
const app = express()

/*
const morgan = require('morgan')
const logger = morgan(':method :url :status :res[content-length] - :response-time ms :body ')
morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})
app.use(express.json())
app.use(logger)
*/

const CONFIG = require('./config/config.json')

const PORT = CONFIG.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const EmployeesRouter = require('./routes/EmployeesRouter')
app.use('/employees', EmployeesRouter)

const CustomersRouter = require('./routes/CustomersRouter')
app.use('/customers', CustomersRouter)