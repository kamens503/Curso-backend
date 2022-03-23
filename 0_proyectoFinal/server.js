const express = require('express'),
      app = express(),
      port = 8080 || process.env.port,
      // cartApi = require('./src/routers/cart'),
      productApi = require('./src/routers/product')
      // userApi = require('./src/routers/user'),

const { faker } = require('@faker-js/faker');



function authUser (req,res, next) {
  const methods = req.route.methods

  next()
}

app.use("/api/productos", productApi);
// app.use("/api", productRouter);


app.use((req, res) => {
  res.status(404).send('Error 404: Ruta o protocolo equivocado')
})

app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`)
  }).on('error', e => {
      console.log(e);
  });