
const model=require('../model/product');
const Product=model.product;


exports.createProducts = async (req, res) => {
    const product = new Product(req.body);     
    const savedProduct = await product.save(); 
    console.log("Product saved:", savedProduct);
    res.status(201).json(savedProduct);      
  
};


exports.getproducts=async (req,res)=>{
    const products=await Product.find();
    res.json(products);

}
exports.getproduct=async (req,res)=>{
   const id = req.params.id;
  const product = await Product.findById(id);
  res.json(product);

  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ error: "Product not found" });
  }
}
exports.deleteproduct=async (req,res)=>{
const id = req.params.id;
const delproduct=await Product.findOneAndDelete({_id:id});
res.json(delproduct);
  
}