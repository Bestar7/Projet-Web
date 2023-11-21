const express = require("express")
const { sequelize, DataTypes} = require("../util/database")
const Customers = require("../models/Customers")(sequelize, DataTypes)

var router = express.Router()


/** CREATE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function createOne(req, res){
  // TODO req.body.eachField != null
  sequelize.authenticate()
  .then(() => {
    return Customers.create({...req.body}, {logging: console.log});
  }).then((customers) => {
    res.json(customers)
  }).catch((err) => {
    console.log("error in POST /customers/\n  "+err)
  })
}

/** READ ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getAll(req, res){
  sequelize.authenticate()
  .then(() => {
    return Customers.findAll({logging: console.log})
  }).then((customers) => {
    res.json(customers)
  }).catch((err) => {
    console.log("error in GET /customers/\n  "+err)
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
    return Customers.findByPk(id);
  }).then((customers) => {
    res.json(customers)
  }).catch((err) => {
    console.log("error in GET /customers/\n  "+err)
  })
}

/** DELETE ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function deleteAll(req, res){
  sequelize.authenticate()
  .then(() => {
    return Customers.destroy({where : {}})
  }).then((customers) => {
    res.json(customers)
  }).catch((err) => {
    console.log("error in DELETE /customers/\n  "+err)
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
    //return Customers.findByPk(id).detroy()
    return Customers.destroy({where : {"CustomerId": id}})
  }).then((customers) => {
    res.json(customers)
  }).catch((err) => {
    console.log("error in DELETE /customers/id\n  "+err);
  })
}


//CREATE ONE
router.post("/", (req, res) => createOne(req, res))

//READ ALL
router.get("/", (req, res) => getAll(req, res))

//READ ONE
router.get("/:id", (req, res) => {getOne(req, res)})


//DELETE ALL // TODO return deleted
router.delete("/", (req, res) => {deleteAll(req, res)})

//DELETE ONE // TODO return deleted
router.delete("/:id", (req, res) => {deleteOne(req, res)})


module.exports = router;