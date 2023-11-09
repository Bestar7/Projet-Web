const express = require("express")
const { sequelize, DataTypes} = require("../util/database")
const OrderDetails = require("../models/Order-Details")(sequelize, DataTypes)

var router = express.Router()

/** CREATE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function createOne(req, res){
  // TODO req.body.eachField != null
  sequelize.authenticate()
  .then(() => {
    
    return OrderDetails.create({
      "OrderId": req.body.OrderId,
      "ProductId": req.body.ProductId,
      "UnitPrice": req.body.UnitPrice,
      "Quantity": req.body.Quantity,
      "Discount": req.body.Discount
    });
  }).then((orderDetails) => {
    res.json(orderDetails)
  }).catch((err) => {
    console.log("error in POST /orderDetails/\n  "+err)
  })
}

/** READ ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getAll(req, res){
  sequelize.authenticate()
  .then(() => {
    return OrderDetails.findAll();
  }).then((orderDetails) => {
    res.json(orderDetails)
  }).catch((err) => {
    console.log("error in GET /orderDetails/\n  "+err)
  })
}

/** READ ONE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function getOne(req, res){
  const order = parseInt(`${req.params.order}`)
  const product = parseInt(`${req.params.order}`)
  sequelize.authenticate()
  .then(() => {
    return OrderDetails.findByPk(order, product);
  }).then((orderDetails) => {
    res.json(orderDetails)
  }).catch((err) => {
    console.log("error in GET /orderDetails/id\n  "+err)
  })
}

/** DELETE ALL
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function deleteAll(req, res){
  sequelize.authenticate()
  .then(() => {
    return OrderDetails.destroy()
  }).then((orderDetails) => {
    res.json(orderDetails)
  }).catch((err) => {
    console.log("error in DELETE /orderDetails/\n  "+err)
  })
}

/** DELETE ONE
 * @param {express.Request} req
 * @param {express.Response} res 
 */
function deleteOne(req, res){
  const order = parseInt(`${req.params.order}`)
  const product = parseInt(`${req.params.order}`)
  sequelize.authenticate()
  .then(() => {
    return OrderDetails.destroy({
      where : {"OrderId": order, "ProductId": product } // TODO verif
    });
  }).then((orderDetails) => {
    res.json(orderDetails)
  }).catch((err) => {
    console.log("error in DELETE /orderDetails/id\n  "+err)
  })
}

//CREATE ONE
router.post("/", (req, res) => createOne(req, res))

//READ ALL
router.get("/", (req, res) => getAll(req, res))

//READ ONE
router.get("/:order/:product", (req, res) => {getOne(req, res)})


//DELETE ALL // TODO return deleted
router.delete("/", (req, res) => {deleteAll(req, res)})

//DELETE ONE // TODO return deleted
router.delete("/:order/:product", (req, res) => {deleteOne(req, res)})


module.exports = router;