require('dotenv').config()
const { container } = require('../../src/config.js'),
      Cart  = require("../../src/controller/mongo/Cart"),
      cart  = new Cart(container.mongodb.host)


let product_id

const { faker } = require('@faker-js/faker');

describe(' [ MONGO.DB ] My cart works if', ()=> {

  it('Can init cart', async () => {
    const msg = await cart.init()
    expect(msg).toMatchObject({ done: true });
  })

  it('Can sync database data to local data', async () => {
    const msg = await cart.syncLocalData()
    try {
      expect(msg).toMatchObject({ done: true });
    } catch (error) {
      console.log(error);
    }
  });


  it('Can add product to cart', async () => {
    const product = {
      name        : faker.commerce.product(),
      description : faker.commerce.productDescription(),
      price       : faker.commerce.price(),
      stock       : faker.datatype.number(),
      img         : faker.image.imageUrl(),
      timestamp   : faker.time.recent(),
      sku         : faker.datatype.number()
    };

    const msg = await cart.addProduct(product)
    try {
      expect(msg).toMatchObject({ done: true });
    } catch (error) {
      console.log(error);
    }
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

    const msg = await cart.addProduct(product)
    try {
      expect(msg).toMatchObject({ done: true });
    } catch (error) {
      console.log(error);
    }
  });
  
  it('Can get all products from cart', async () => {
    const msg = await cart.get()
    try {
      expect(msg).toMatchObject({ done: true });
    } catch (error) {
      console.log(error);
    }
    
  });

  it('Can get Index of first product', () => {
    const id = cart.getProductByIndex(0).result._id 
    try {
      expect(cart.getIndex(id)).toBe(0);
    } catch (e) {
      console.log(cart.getIndex(id));
    }
  
  })

  
  it('Can get first product Index', () => { 
    try {
      expect(cart.getProductByIndex(0)).toMatchObject({ done: true });  
    } catch (error) {
      console.log(cart.getProductByIndex(0))
    }
  })
  
  it('Can delete first product from cart', async () => {

    const id = cart.getProductByIndex(0).result._id 

    const msg = await cart.delete(id)
    try {
      expect(msg).toMatchObject({ done: true });
    } catch (error) {
      console.log(error);
    }
  })

  it('Can empty the cart', async () => {
    const msg = await cart.delete()
    try {
      expect(msg).toMatchObject({ done: true });
    } catch (error) {
      console.log(error);
    }
  })

  it('Can disconect from Database', async () => {
    const msg = await cart.disconnect()
    try {
      expect(msg).toMatchObject({ done: true });
    } catch (error) {
      console.log(error);
    }
  })
})