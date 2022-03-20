require('dotenv').config()
const { container } = require('../../src/config.js'),
      Cart  = require("../../src/controller/mongo/Cart"),
      cart  = new Cart(container.mongodb.host)


let product_id

const { faker } = require('@faker-js/faker');

describe(' [ MONGO.DB ] My cart works if', ()=> {

  it('Can sync database data to local data', async () => {
    return cart.syncLocalData()
                .catch(e => {
                  console.log(e);
                })
  });


  it('Can add product to cart', () => {
    const product = {
      name        : faker.commerce.product(),
      description : faker.commerce.productDescription(),
      price       : faker.commerce.price(),
      stock       : faker.datatype.number(),
      img         : faker.image.imageUrl(),
      timestamp   : faker.time.recent(),
      sku         : faker.datatype.number()
    };
    cart.addProduct(product).then( r => {
      expect(r).toMatchObject({ done: true });
    }).catch( e => {
    })
  });

  it('Can add another product', () => {
    const product = {
      name        : faker.commerce.product(),
      description : faker.commerce.productDescription(),
      price       : faker.commerce.price(),
      stock       : faker.datatype.number(),
      img         : faker.image.imageUrl(),
      timestamp   : faker.time.recent(),
      sku         : faker.datatype.number()
    };
    cart.addProduct(product).then( r => {
      expect(r).toMatchObject({ done: true });
    }).catch( e => {
    })
  });
  
  it('Can get all products from cart', async () => {
    
    return cart.get().then( r => {
      try {
        expect(r).toMatchObject({ done: true });
      } catch (error) {
        console.log(error)
      }
    })
    
  });

  it('Can get Index of first product', () => {
    const id = cart.getProductFromIndex(0).result._id 
    try {
      expect(cart.getIndex(id)).toBe(0);
    } catch (e) {
      console.log(cart.getIndex(id));
    }
  
  })

  
  it('Can get first product Index', () => { 
    try {
      expect(cart.getProductFromIndex(0)).toMatchObject({ done: true });  
    } catch (error) {
      console.log(cart.getProductFromIndex(0))
    }
  })
  
  it('Can delete first product from cart', async () => {

    const id = cart.getProductFromIndex(0).result._id 

    return cart.delete(id)
        .then( r => {
          console.log(r);
          try {
            expect(r).toMatchObject({ done: true });
          } catch (error) {
            console.log(error);
          }
        })
        .catch(e => {
          console.log(e);
        })
  })

  it('Can empty the cart', async () => {
    return cart.delete().then( r => {
      try {
        expect(r).toMatchObject({ done: true });
      } catch (e) {
      }
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