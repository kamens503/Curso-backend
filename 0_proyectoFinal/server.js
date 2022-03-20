const express = require('express'),
      app = express(),
      port = 8080 || process.env.port,
      { container } = require('./src/config')


const collection = container.firebase.collection.cart
console.log(collection);

// app.use(isAuthorized())

// app.use("/api/productos", productRouter);
// app.use("/api", cartRouter);
// app.use((req, res) => {
//     res.status(404).send('Error 404: Ruta o protocolo equivocado')
// })
// app.listen(port, () => {
//     console.log(`Escuchando en http://localhost:${port}`)
//   }).on('error', e => {
//       console.log(e);
//   });