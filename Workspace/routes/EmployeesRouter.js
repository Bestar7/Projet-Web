const express = require("express")
const { sequelize, DataTypes} = require("../util/database")
const Employees = require("../models/Employees")(sequelize, DataTypes)

var router = express.Router()

/** CREATE
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
    res.json(employees)
  }).catch((err) => {
    console.log("error in POST /employees/\n  "+err)
  })
}

/** READ ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getAll(req, res){
  sequelize.authenticate()
  .then(() => {
    return Employees.findAll();
  }).then((employees) => {
    res.json(employees)
  }).catch((err) => {
    console.log("error in GET /employees/\n  "+err)
  })
}

/** READ ONE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getOne(req, res){
  const id = parseInt(`${req.params.id}`)
  sequelize.authenticate()
  .then(() => {
    return Employees.findByPk(id);
  }).then((employees) => {
    res.json(employees)
  }).catch((err) => {
    console.log("error in GET /employees/id\n  "+err)
  })
}

/** DELETE ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function deleteAll(req, res){
  sequelize.authenticate()
  .then(() => {
    return Employees.detroy()
  }).then((employees) => {
    res.json(employees)
  }).catch((err) => {
    console.log("error in DELETE /employees/\n  "+err)
  })
}

/** DELETE ONE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function deleteOne(req, res){
  const id = parseInt(`${req.params.id}`)
  sequelize.authenticate()
  .then(() => {
    return Employees.detroy({
      where : {"EmployeeId": id}
    });
  }).then((employees) => {
    res.json(employees)
  }).catch((err) => {
    console.log("error in DELETE /employees/id\n  "+err)
  })
}

//CREATE ONE
router.post("/", (req, res) => createOne(req, res))

//READ ALL
router.get("/", (req, res) => getAll(req, res))

//READ ONE
router.get("/:id", (req, res) => {getOne(req, res)})


//DELETE ALL
router.delete("/", (req, res) => {deleteAll(req, res)})

//DELETE ONE
router.delete("/:id", (req, res) => {deleteOne(req, res)})


module.exports = router;