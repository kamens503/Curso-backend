const express = require('express'),
      app = express(),
      port = 8080 || process.env.port

const { faker } = require('@faker-js/faker');
const { container } = require('./src/config'),
      Product  = require("./src/controller/firebase/Product"),
      product  = new Product(container.firebase.collection.product)

async function  test () {
  console.log(await product.init());
  const new_product = {
    name        : faker.commerce.product(),
    description : faker.commerce.productDescription(),
    price       : faker.commerce.price(),
    stock       : faker.datatype.number(),
    img         : faker.image.imageUrl(),
    timestamp   : faker.time.recent(),
    sku         : faker.datatype.number()
  };
  console.log(await product.addProduct(new_product));
  let first_product =product.getProductByIndex(0)
  console.log(first_product.result.name);
  
  // await product.update(first_product.result.id, {name: 'Objecto actualizado'})
  
  console.log(product.getProductByIndex(0));
}

test()


// app.use(isAuthorized())

// app.use("/api/productos", productRouter);
// app.use("/api", productRouter);
// app.use((req, res) => {
//     res.status(404).send('Error 404: Ruta o protocolo equivocado')
// })
// app.listen(port, () => {
//     console.log(`Escuchando en http://localhost:${port}`)
//   }).on('error', e => {
//       console.log(e);
//   });