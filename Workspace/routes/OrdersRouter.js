const express = require("express")
const { sequelize, DataTypes} = require("../util/database")
const Orders = require("../models/Orders")(sequelize, DataTypes)

var router = express.Router()

/** CREATE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function createOne(req, res){
  // TODO req.body.eachField != null
  sequelize.authenticate()
  .then(() => {
    return Orders.create({...req.body});
  }).then((orders) => {
    res.json(orders)
  }).catch((err) => {
    console.log("error in POST /orders/\n  "+err)
  })
}

/** READ ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getAll(req, res){
  sequelize.authenticate()
  .then(() => {
    return Orders.findAll();
  }).then((orders) => {
    res.json(orders)
  }).catch((err) => {
    console.log("error in GET /orders/\n  "+err)
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
    return Orders.findByPk(id);
  }).then((orders) => {
    res.json(orders)
  }).catch((err) => {
    console.log("error in GET /orders/id\n  "+err)
  })
}

/** DELETE ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function deleteAll(req, res){
  sequelize.authenticate()
  .then(() => {
    return Orders.destroy()
  }).then((orders) => {
    res.json(orders)
  }).catch((err) => {
    console.log("error in DELETE /orders/\n  "+err)
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
    return Orders.destroy({
      where : {"EmployeeId": id}
    });
  }).then((orders) => {
    res.json(orders)
  }).catch((err) => {
    console.log("error in DELETE /orders/id\n  "+err)
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