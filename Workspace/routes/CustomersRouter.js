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
    return Customers.create({...req.body});
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
    return Customers.findAll(req.where)
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
    Customers.findAll()
    .then((result) => {
      Customers.destroy({where : {}}) // TODO verif destroy works
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

// called as next put every calling return->next.ppp
/** MIDDLEWARE cndtnHandler
 * @param {express.Request} req
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */ // TODO check param (Year) exist in Customer.Module
function cndtnHandler(req, res, next){
  var cndtn = { where : { }}

  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      if (propName == "Pas Customer condition"){
        res.send(

        )
      }

      cndtn.where = {...cndtn.where, [propName] : req.query[propName]}
      console.log("condition = ", propName, req.query[propName]);
    }
  }

  req.where = cndtn
  next()
}

//CREATE ONE
router.post("/", (req, res) => createOne(req, res))

//READ ALL
router.get("/", (req, res) => getAll(req, res))

//READ WHERE
router.get("/cndtn", cndtnHandler, (req, res) => getAll(req, res))

//READ ONE
router.get("/:id", (req, res) => {getOne(req, res)})


//DELETE ALL
router.delete("/", (req, res) => {deleteAll(req, res)})

//TODO DELETE WHERE (diff route /cdtn?.... ou dans delete all "/")
router.delete("/cndtn", (req, res) => {deleteAll(req, res)})
//deleteWhere(req, res)

//DELETE ONE
router.delete("/:id", (req, res) => {deleteOne(req, res)})


module.exports = router;