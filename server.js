const express = require("express");
const morgan = require("morgan");

const app = express();

let products = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    thumbnail: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
];

app.use(morgan("dev"));
app.use(express.json());

 /* All producs */
app.get('/api/products', (req, res) => {
  res.json(products);
});

/* Get a product id */
app.get('/api/products/:id', (req,res) => {
  const productFound = products.find(
      (product) => product.id === parseInt(req.params.id)
  );

  if(!productFound) return res.status(404).json({
      message: "Product not Found"
  })
  
  res.json(productFound)
})

/* Update a product */
app.put('/api/products/:id', (req,res) => {

  const newData = req.body
  const productFound = products.find(
      (product) => product.id === parseInt(req.params.id)
  );

  if(!productFound) return res.status(404).json({
      message: "Product not Found"
  })

  products = products.map( p => p.id === parseInt(req.params.id) ? {...p, ...newData } : p)


  res.json({
      message : "Product Updated Successfully"
  })
})

/* Delete a product */
app.delete('/api/products/:id', (req,res) => {
  const productFound = products.find(
      (product) => product.id === parseInt(req.params.id)
  );

  if(!productFound) return res.status(404).json({
      message: "Product not Found"
  })

  products = products.filter(p => p.id !== parseInt(req.params.id))

  res.sendStatus(204)
})


app.listen(3000);
console.log(`Server on port ${3000}`);
