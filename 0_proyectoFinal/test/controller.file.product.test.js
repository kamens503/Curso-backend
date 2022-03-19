// declare var test: any
// declare var expect: any

const Product = require('../src/controller/file/Product'),
	filename = 'products',
	products = new Product(filename)

let product_id

const { faker } = require('@faker-js/faker');

describe('My container works if', ()=> {

  it('Can Assign a container', () => {
    let msg = products.assignContainer(filename)
    try {
      expect(products.assignContainer(filename)).toBe(true);
    } catch (error) {
      console.log(msg);
    }
    
  });

  it('Can update database/file', () => {
    expect(products.rewrite()).toMatchObject({ done: true });
  });

  it('Can add product to container', () => {
    const product = {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      stock: faker.datatype.number(),
      img: faker.image.imageUrl(),
      timestamP: faker.time.recent(),
    };
    expect(products.add(product)).toMatchObject({ done: true });
  });

  it('Can add another product', () => {
    const product = {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      stock: faker.datatype.number(),
      img: faker.image.imageUrl(),
      timestamP: faker.time.recent(),
    };
    expect(products.add(product)).toMatchObject({ done: true });
  });
  
  it('Can get all products', () => {
    expect(products.get()).toMatchObject({ done: true });;
  });

  it('Can get Index of product', () => {
    expect(products.getIndex(0)).toEqual(expect.any(Number));
  
  })

  
  it('Can get first product Index', () => { 
    expect(products.getFromIndex(0)).toMatchObject({ done: true });  
  })
  
  it('Can get first product', () => {
    expect(products.get(0)).toMatchObject({ done: true });
  });
  
  it('Can delete first product', () => {
    product_id = products.getFromIndex(0).result.id
    const product = products.delete(product_id)
    expect(product).toMatchObject({ done: true });
  })

  // it('Can empty the container', () => {
  //   const msg = products.delete()
  //   // console.log(msg);
  //   expect(msg).toMatchObject({ done: true });
  // })

})