const express = require("express");
const router = express.Router();
const mgmtController = require('../Controllers/mgmtController')
const validateData = require('../Middlewares/validateData')

router.post('/addProduct',validateData, mgmtController.createData)

 router.get('/getProducts', mgmtController.getAllProducts)

router.get('/:id', mgmtController.getProductById);

router.put('/updateProduct/:id', validateData, mgmtController.updateProductById);

router.delete('/deleteProduct/:id',mgmtController.deleteProductById)

module.exports = router;