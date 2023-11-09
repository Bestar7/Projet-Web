const express = require("express")
const { sequelize, DataTypes} = require("../util/database");
const Employees = require("../models/Employees")(sequelize, DataTypes);

var router = express.Router();

/**
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function createOne(req, res){
  // TODO req.body.eachField != null
  const LastName = req.body.LastName
  const FirstName = req.body.FirstName
  sequelize.authenticate()
  .then(() => {
    // return Employees.create({...req.body});
    return Employees.create({FirstName, LastName});
  }).then((employees) => {
    res.json(employees);
  }).catch((err) => {
    console.log("error in POST /employees/\n  "+err);
  })
}

function getAll(res){
  sequelize.authenticate()
  .then(() => {
    return Employees.findAll();
  }).then((employees) => {
    res.json(employees);
  }).catch((err) => {
    console.log("error in GET /employees/\n  "+err);
  })
}

function getOne(req, res){
  const index = parseInt(`${req.params.id}`)
  sequelize.authenticate()
  .then(() => {
    return Employees.findByPk(index);
  }).then((employees) => {
    res.json(employees);
  }).catch((err) => {
    console.log("error in GET /employees/id\n  "+err);
  })
}

//CREATE ONE
router.post("/", (req, res) => createOne(req, res))

//READ ALL
router.get("/", (req, res) => getAll(res))

//READ ONE
router.get("/:id", (req, res) => {getOne(req, res)})

module.exports = router;