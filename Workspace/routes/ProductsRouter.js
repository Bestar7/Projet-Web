const express = require("express")
const { sequelize, DataTypes} = require("../util/database")
const Products = require("../models/Products")(sequelize, DataTypes)

var router = express.Router()


/** CREATE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function createOne(req, res){
  // TODO req.body.eachField != null
  sequelize.authenticate()
  .then(() => {
    return Products.create({...req.body});
  }).then((products) => {
    res.json(products)
  }).catch((err) => {
    console.log("error in POST /products/\n  "+err)
  })
}

/** READ ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getAll(req, res){
  sequelize.authenticate()
  .then(() => {
    return Products.findAll()
  }).then((products) => {
    res.json(products)
  }).catch((err) => {
    console.log("error in GET /products/\n  "+err)
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
    return Products.findByPk(id);
  }).then((products) => {
    res.json(products)
  }).catch((err) => {
    console.log("error in GET /products/\n  "+err)
  })
}

/** DELETE ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function deleteAll(req, res){
  sequelize.authenticate()
  .then(() => {
    return Products.destroy()
  }).then((products) => {
    res.json(products)
  }).catch((err) => {
    console.log("error in DELETE /products/\n  "+err)
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
    //return Products.findByPk(id).detroy()
    return Products.destroy({where : {"ProductId": id}})
  }).then((products) => {
    res.json(products)
  }).catch((err) => {
    console.log("error in DELETE /products/id\n  "+err);
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