const express = require('express'),
      productRouter = require('./src/routers/product'),
      cartRouter = require('./src/routers/cart'),
      User = require('./src/controller/User.js'),      
      app = express(),
      port = 8080 || process.env.port;

require('dotenv').config()

app.use("/api/productos", productRouter);
app.use("/api", cartRouter);
app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`)
  }).on('error', e => {
      console.log(e);
  });