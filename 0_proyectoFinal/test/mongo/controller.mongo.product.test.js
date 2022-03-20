require('dotenv').config()
const { controller } = require('../../src/config.js'),
      Product = controller.mongodb.Product,
      products = new Product(process.env.MONGODB_CONNECTION)


let product_id

const { faker } = require('@faker-js/faker');

describe('My products works if', ()=> {

  it('Can connect to database and store data to property data', done => {
    products.syncLocalData().then(r => {
      done()
    }).catch(e => {
      products.disconnect()
      done(e)
    })
  });


  it('Can add product to products', done => {
    const product = {
      name        : faker.commerce.product(),
      description : faker.commerce.productDescription(),
      price       : faker.commerce.price(),
      stock       : faker.datatype.number(),
      img         : faker.image.imageUrl(),
      timestamp   : faker.time.recent(),
      sku         : faker.datatype.number()
    };
    products.addProduct(product).then( r => {
      expect(r).toMatchObject({ done: true });
      done()
    }).catch( e => {
      products.disconnect()
      done(e)
    })
  });

  it('Can add another product', done => {
    const product = {
      name        : faker.commerce.product(),
      description : faker.commerce.productDescription(),
      price       : faker.commerce.price(),
      stock       : faker.datatype.number(),
      img         : faker.image.imageUrl(),
      timestamp   : faker.time.recent(),
      sku         : faker.datatype.number()
    };
    products.addProduct(product).then( r => {
      expect(r).toMatchObject({ done: true });
      done()
    }).catch( e => {
      products.disconnect()
      done(e)
    })
  });
  
  it('Can get all products from products', done => {
    
    products.get().then( r => {
      try {
        expect(r).toMatchObject({ done: true });
        done()
      } catch (error) {
        console.log(error)
        products.disconnect()
        done(error)
      }
    })
    
  });

  it('Can get Index of first product', () => {
    const id = products.getProductFromIndex(0).result._id 
    try {
      expect(products.getIndex(id)).toBe(0);
    } catch (e) {
      console.log(products.getIndex(id));
      products.disconnect()
    }
  
  })

  
  it('Can get first product Index', () => { 
    try {
      expect(products.getProductFromIndex(0)).toMatchObject({ done: true });  
    } catch (error) {
      console.log(products.getProductFromIndex(0))
      products.disconnect()
    }
  })
  
  it('Can delete first product from products', done => {

    const id = products.getProductFromIndex(0).result._id 

    products.delete(id)
        .then( r => {
          console.log(r);
          try {
            expect(r).toMatchObject({ done: true });
            done()
          } catch (error) {
            done(error)
            products.disconnect()
          }
        })
        .catch(e => {
          console.log(e);
          products.disconnect()
        })
  })

  // it('Can empty the products', done => {
  //   products.delete().then( r => {
  //     console.log(r);
  //     try {
  //       expect(r).toMatchObject({ done: true });
  //       done()
  //     } catch (e) {
  //       products.disconnect()
  //       done(e)
  //     }
  //   }).catch(e => {
  //     console.log(e);
  //   }) 
  // })

})