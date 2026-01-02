const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data.json');


exports.successMsg = (req, res)=>{

  res.send('Server is running successfully');
}

// To add a new product

exports.createData = (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataPath));
    const maxId = data.length > 0
  ? Math.max(...data.map(item => item.productId))
  : 0;
     const newProduct = {
  productId: maxId + 1,
  ...req.body
};
    data.push(newProduct);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.status(201).json(newProduct);
}

//To get all products data

exports.getAllProducts = (req, res) => {

    const data = JSON.parse(fs.readFileSync(dataPath));
  res.json(data);

}

//Get a product by ID
exports.getProductById = (req, res) => {
     const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const product = data.find((b) => {

      return  b.productId === Number(req.params.id)
    })
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
}

//To update product details

exports.updateProductById = (req,res)=>{
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

     const product = data.find((b) => {

      return  b.productId === parseInt(req.params.id)
    })
 if (!product) return res.status(404).send('Product not found');

 const {productName, description, stock}=req.body;

 if(productName){ product.productName = productName;}
 if(description){ product.description = description;}

if (stock !== undefined) product.stock = stock;

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

res.json(product);
}

//Delete a product by id

exports.deleteProductById = (req,res)=>{
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const index = data.findIndex((b)=>{
      return  b.productId ===parseInt(req.params.id)
    })
if (index === -1){
    return res.status(404).send('Product not Found');
}
const deletedProduct= data.splice(index,1);
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
res.status(200).json({
    message: 'Product deleted successfully',
    deletedProduct: deletedProduct[0]
  });
}

