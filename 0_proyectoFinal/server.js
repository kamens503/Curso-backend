const express = require('express'),
      app = express(),
      port = 8080 || process.env.port,
      cartApi = require('./src/routers/cart'),
      productApi = require('./src/routers/product')
      User = require('./src/controller/User'),
      { controller } = require('./src/config'),
      user = new User({name: controller.user.name, isAdmin: controller.user.admin, id: 0}) 

const { faker } = require('@faker-js/faker');

//Middleware -> User access control
app.use( (req,res,next) => {
  const method    = req.method,
        url       = req.originalUrl
  let container = 'cart'

  if (url.includes("/api/productos")) {
    container = 'product'
  }

  switch (method) {
    case 'GET':
      if (!user.can('read',container)) {
        return res.status(403).send('No tienes acceso a esta funcionalidad')
      }
      break;
    default:
      break;
    case 'POST':
      if (!user.can('create',container)) {
        return res.status(403).send('No tienes acceso a esta funcionalidad')
      }
      break;
    case 'PUT':
      if (!user.can('update',container)) {
        return res.status(403).send('No tienes acceso a esta funcionalidad')
      }
      break;
    case 'DELETE':
      if (!user.can('delete',container)) {
        return res.status(403).send('No tienes acceso a esta funcionalidad')
      }
      break;
  }
  next()
})


app.use("/api/productos", productApi);
app.use("/api", cartApi);


app.use((req, res) => {
  res.status(404).send('Error 404: Ruta o protocolo equivocado')
})

app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`)
  }).on('error', e => {
      console.log(e);
  });