const express = require("express")
const { sequelize, DataTypes} = require("../util/database");
//const Customers = require("../models/Customers")(sequelize, DataTypes);
const Employees = require("../models/Employees")(sequelize, DataTypes);

var router = express.Router();

// Routes. These blocks should be placed in different files under "routes/" directory
// but let's keep this simple.
router.get("/", (request, response) => {
  sequelize.authenticate()
  .then(() => {
    //Customers.findAll()
    return Employees.findAll();
  }).then((employees) => {
    response.json(employees);
  }).catch((err) => {
      console.log("$$$$$$ findAll()\n  "+err);
  })
})

module.exports = router;