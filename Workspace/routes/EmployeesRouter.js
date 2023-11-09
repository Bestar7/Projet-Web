const express = require("express")
const { sequelize, DataTypes} = require("../util/database");
const { DataTypes } = require("sequelize");
//const Customers = require("../models/Customers")(sequelize, DataTypes);
const Employees = require("../models/Employees")(sequelize, DataTypes);

var router = express.Router();

//const user = await Employees.
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
  /*
  sequelize.authenticate().then((val)=>console.log(val));
  //const ok = await this.mo
  sequelize.sync()//({force: true}) // pour mettre DAO en DB
  .then((result) => {
    //console.log(result.config);
    //return Employees.findAll()
    */
    /*
    Employees.findAll().then((people) => {
      response
        .type("text")
        .send(people)
      console.log(people)
      return people
    }).catch((err) => {
      console.log("$$$$$$ findAll()\n  "+err);
    })*/
})

module.exports = router;