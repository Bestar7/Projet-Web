const express = require("express")
const app = express()

const CONFIG = require('./config/config.json')

const PORT = CONFIG.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const EmployeesRouter = require('./routes/EmployeesRouter')
app.use('/employees', EmployeesRouter)

const CustomersRouter = require('./routes/CustomersRouter')
app.use('/customers', CustomersRouter)
/*
const express = require("express")
const morgan = require('morgan')
const CONFIG = require('./config/ma_config.json')


morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

const logger = morgan(':method :url :status :res[content-length] - :response-time ms :body ')
const app = express()
app.use(express.json())
app.use(logger)


const PORT = CONFIG.PORT//3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


var personRouter = require('../Autre/router/PersonRouter')
//var otherRouter = require('./1_Presentation/other')

app.use('/', personRouter)
//app.use('/', otherRouter)

module.exports = app;
*/