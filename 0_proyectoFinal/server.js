const express = require('express'),
      app = express(),
      port = 8080 || process.env.port,
      { Product: productRouter , Cart : cartRouter } = require('./src/dao.js')

// console.log(productRouter);
cartRouter.get().then( r => {
  id = r.result[0]._id
  console.log( JSON.stringify(id) )
  }
)
      

require('dotenv').config()

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