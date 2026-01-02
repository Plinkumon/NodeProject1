const validateData =(req,res,next)=>{

 const {productName, description, stock } = req.body;
    if(!productName||!description||stock===undefined){
        return res.status(400).send('Name, description and availability of items are required')
    }
    next();
}
console.log('Handler type:', typeof validateData);
module.exports = validateData;