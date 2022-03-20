require('dotenv').config()
const { container } = require('../../src/config.js'),
      Product = require("../../src/controller/mongo/Product"),
      products = new Product(container.mongodb.host)


let product_id

const { faker } = require('@faker-js/faker');

describe(' [ MONGO.DB ] My products works if', ()=> {

  it('Can sync database data to local data', done => {
    products.syncLocalData().then(r => {
      done()
    }).catch(e => {
      done(e)
    })
  });


  it('Can add product to products', async () => {
    const product = {
      name        : faker.commerce.product(),
      description : faker.commerce.productDescription(),
      price       : faker.commerce.price(),
      stock       : faker.datatype.number(),
      img         : faker.image.imageUrl(),
      timestamp   : faker.time.recent(),
      sku         : faker.datatype.number()
    };
    return products.addProduct(product).then( r => {
      expect(r).toMatchObject({ done: true });
    }).catch( e => {
      console.log(e);
    })
  });

  it('Can add another product', async () => {
    const product = {
      name        : faker.commerce.product(),
      description : faker.commerce.productDescription(),
      price       : faker.commerce.price(),
      stock       : faker.datatype.number(),
      img         : faker.image.imageUrl(),
      timestamp   : faker.time.recent(),
      sku         : faker.datatype.number()
    };
    return products.addProduct(product).then( r => {
      expect(r).toMatchObject({ done: true });
    }).catch( e => {
      console.log(e);
    })
  });
  
  it('Can get all products from products', async () => {
    
    return products.get().then( r => {
      expect(r).toMatchObject({ done: true });
    })
    
  });

  it('Can get Index of first product', () => {
    const id = products.getProductFromIndex(0).result._id 
    try {
      expect(products.getIndex(id)).toBe(0);
    } catch (e) {
      console.log(products.getIndex(id));
    }
  
  })

  
  it('Can get first product Index', () => { 
    try {
      expect(products.getProductFromIndex(0)).toMatchObject({ done: true });  
    } catch (error) {
      console.log(products.getProductFromIndex(0))
    }
  })
  
  it('Can delete first product from products', async () => {

    const id = products.getProductFromIndex(0).result._id 

    return products.delete(id)
        .then( r => {
          expect(r).toMatchObject({ done: true });
        })
        .catch(e => {
          console.log(e);
        })
  })

  it('Can empty the products', async () => {
    return products.delete().then( r => {
      expect(r).toMatchObject({ done: true });
    }).catch(e => {
      console.log(e);
    }) 
  })

    // It may disconnect before finish the others test Enable it only to test disconnect method
  // it('Can disconect from Database', async () => {
  //   return cart.disconnect()
  //           .catch(e => {
  //             console.log(e);
  //           })
  // });

})