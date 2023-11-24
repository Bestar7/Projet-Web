const express = require("express")
const { sequelize, DataTypes} = require("../util/database")
const Customers = require("../models/Customers")(sequelize, DataTypes)
const { cndtnHandler } = require('./MiddleWare')

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
<<<<<<< HEAD
    return Customers.findAll(req.where)
=======
    return Customers.findAll({logging: console.log})
>>>>>>> 600b8cee0884b6a4db4ac936a996d9dc92342eaf
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
    Customers.findAll(req.where)
    .then((result) => {
      Customers.destroy(req.where) // TODO verif destroy works
      return result
    }).then((customers) => {res.json(customers)})
  }).catch((err) => {
    console.log("error in DELETE /customers/id\n  "+err);
  })
}

/** DELETE ONE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function deleteOne(req, res){
  const cndtn = {where : {...req.params }}
  sequelize.authenticate()
  .then(() => {
    Customers.findOne(cndtn)
    .then((result) => {
      Customers.destroy(cndtn)
      return result
    }).then((customers) => {
      res.json(customers)
    }).catch((err) => {
    console.log("error in DELETE /customers/id\n  "+err);
    })
  })
}


//CREATE ONE
router.post("/", (req, res) => createOne(req, res))

//READ ALL
router.get("/", cndtnHandler, (req, res) => getAll(req, res))

//READ WHERE
router.get("/cndtn", cndtnHandler, (req, res) => getAll(req, res))

//READ ONE
router.get("/:CustomerId", (req, res) => {getOne(req, res)})

//DELETE ALL
router.delete("/", cndtnHandler, (req, res) => {deleteAll(req, res)})

//DELETE WHERE
router.delete("/cndtn", cndtnHandler, (req, res) => {deleteAll(req, res)})

//DELETE ONE
router.delete("/:CustomerId", (req, res) => {deleteOne(req, res)})


module.exports = router;