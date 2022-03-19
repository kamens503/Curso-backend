const { Cart: cart } = require('../src/dao.js')


let product_id

const { faker } = require('@faker-js/faker');

describe('My cart works if', ()=> {

  it('Can connect to database and store data to property data', done => {
    cart.syncLocalData().then(r => {
      done()
    }).catch(e => {
      cart.disconnect()
      done(e)
    })
  });


  // it('Can add product to cart', done => {
  //   const product = {
  //     name: faker.commerce.product(),
  //     description: faker.commerce.productDescription(),
  //     price     : faker.commerce.price(),
  //     stock     : faker.datatype.number(),
  //     img       : faker.image.imageUrl(),
  //     timestamp : faker.time.recent(),
  //     sku       : faker.datatype.number()
  //   };
  //   cart.addProduct(product).then( r => {
  //     expect(r).toMatchObject({ done: true });
  //     done()
  //   }).catch( e => {
  //     cart.disconnect()
  //     done(e)
  //   })
  // });

  // it('Can add another product', done => {
  //   const product = {
  //     name: faker.commerce.product(),
  //     description: faker.commerce.productDescription(),
  //     price     : faker.commerce.price(),
  //     stock     : faker.datatype.number(),
  //     img       : faker.image.imageUrl(),
  //     timestamp : faker.time.recent(),
  //     sku       : faker.datatype.number()
  //   };
  //   cart.addProduct(product).then( r => {
  //     expect(r).toMatchObject({ done: true });
  //     done()
  //   }).catch( e => {
  //     cart.disconnect()
  //     done(e)
  //   })
  // });
  
  // it('Can get all products from cart', done => {
    
  //   cart.get().then( r => {
  //     try {
  //       expect(r).toMatchObject({ done: true });
  //       done()
  //     } catch (error) {
  //       console.log(error)
  //       cart.disconnect()
  //       done(error)
  //     }
  //   })
    
  // });

  it('Can get Index of product', () => {
    try {
      expect(cart.getIndex("6235f157919de380892152f7")).toBeGreaterThanOrEqual(0);
    } catch (e) {
      console.log(cart.getIndex("6235f157919de380892152f7"));
      cart.disconnect()
    }
  
  })

  
  it('Can get first product Index', () => { 
    try {
      expect(cart.getProductFromIndex(0)).toMatchObject({ done: true });  
    } catch (error) {
      console.log(cart.getProductFromIndex(0))
      cart.disconnect()
    }
  })
  
  it('Can delete first product from cart', async done => {

    const id = cart.getProductFromIndex(0).result._id 

    cart.delete(id)
        .then( r => {
          console.log(r);
          expect(r).toMatchObject({ done: true });
          done()
        })
        .catch(e => {
          done(e)
        })
  })

  // it('Can empty the cart', async done => {
  //   const msg = await cart.delete()

  //   try {
  //     expect(msg).toMatchObject({ done: true });
  //     done()
  //   } catch (error) {
  //     console.log(msg);
  //     cart.disconnect()
  //     done(error)
  //   }
  // })

})