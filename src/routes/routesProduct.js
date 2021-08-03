const express = require("express");
const routerProduct = express.Router();
const controllers = require("../controllers/controllers.js");

routerProduct.put('/:id', controllers.actualizar )

routerProduct.delete('/:id', controllers.borrar )

module.exports = routerProduct;