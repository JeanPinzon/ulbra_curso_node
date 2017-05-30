const express = require('express')
const bodyParser= require('body-parser')
const mongoose = require('mongoose');
const Product = require('./product');
const app = express()


const port = process.env.PORT || 8000;
mongoose.connect('mongodb://ulbra_curso_node:ulbra_curso_node@ds157571.mlab.com:57571/ulbra_curso_node');


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());


app.get('/product', (req, res) => {
  Product.find((err, products) => {
    if (err) res.send(err);
    res.json(products);
  });
})

app.post('/product', (req, res) => {
  let product = new Product();

  product.name = req.body.name;
  product.value = req.body.value;

  product.save(error => {
    if (error) res.send(error);
    else res.json();
  });
})

app.get('/product/:id', (req, res) => {
  Product.findById(req.params.id, (error, product) => {
    if (error) res.send(error);
    res.json(product);
  });
})

app.put('/product/:id', (req, res) => {
  Product.findById(req.params.id, (error, product) => {
    if (error) res.send(error);

    product.name = req.body.name;
    product.value = req.body.value;

    product.save(error => {
      if (error) res.send(error);
      res.json();
    });
  });
})

app.delete('/product/:id', (req, res) => {
  Product.remove({ _id: req.params.id }, error => {
    if (error) res.send(error);
    res.json();
  });
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
})
