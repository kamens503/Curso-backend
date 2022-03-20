// const mongoose = require('mongoose')
// const model = require('./models/cart.model.js')

class Cart {
  constructor(conexion = false) {
    this.conexion = conexion
    if (!conexion) {
      throw 'Error: Invalid mongodb conexion path'
    }

    this.timestamp = Date.now()
    this.on = {
      denied: "No tienes permiso para hacer esta acción",
      modified: {
        success: "Datos cargado con éxito",
        fail: "Algo salió mal! Carga incorrecta, verifique los datos pruebe nuevamente"
      },
      deleted: {
        success: 'Datos borrados con éxito',
        fail: 'Algo salió mal! No se pude borrar'
      },
      notFound: {
        cart: "Producto no encontrado",
        product: "Carrito no encontrado"
      },
      default: {
        success: 'Acción realizada con éxito',
        fail: 'Algo salió mal! Prueba nuevamente'
      }
    }
    this.productTemplate = {
      id: 0,
      timestamp: Date.now(),
      name: '',
      description: '',
      sku: 0,
      img: '',
      price: 0,
      stock: 0
    }
    this.client = mongoose
    this.client.connect(this.conexion)
  }

  async syncLocalData() {
    
      try {
        this.data = await model.find().exec()
        return true
      } catch (e) {
          console.log(e);
          return false
      }
  }

  disconnect(){
    this.client.disconnect().catch(e => {console.log(e);})
  }

  async saveProduct(product) {
    const new_product = new model(product)
    try {
      await new_product.save()
      
    } catch (error) {
        console.log(error);
        return {done: false, result: error}
    }
    await this.syncLocalData()
    return {done: true, result: this.on.modified.success}
  }
  

  isProductInContainer = (id) => {
    if (typeof product_id !== 'number') return false

    const exist = this.data.find(product => product?.id === id) ?
      this.data.find(product => product?.id === id) :
      false

    if (id && !exist || id && exist == undefined) {
      return false
    }
    return true
  }

  async addProduct (product) {

    product.timestamp = Date.now()

    const newProduct = {
      ...this.template,
      ...product
    }
    
    const msg = await this.saveProduct(newProduct)
    this.data = await this.syncLocalData(this.conexion)

    return msg.done ? {
      done: msg.done,
      result: this.on.modified.success
    } : {
      done: false,
      result: `${this.on.modified.fail} : ${msg.result}`
    }

  }

   get = async (product_id = false) => {
    await this.syncLocalData()
    const result = typeof product_id === 'number' 
                  ? {
                    done: true,
                    result: this.data.find(product => product?.id === product_id).exec()
                  } 
                  : {
                    done: true,
                    result: this.data
                  }

    if (!result.result) {
      return {
        done: false,
        result: this.on.notFound.product
      }
    }
    return result
  }

  getIndex = (id) => {
    const result       = this.data.findIndex(product => {
      const product_id = JSON.stringify(product._id)
      const equal      = product_id.replace(/"/g,"") == id 
      return equal
    })
    return result
  }

  getProductFromIndex = (index) => {
    const {name, price, description, sku, img, stock, timestamp, _id: product_id} = this.data[index]
    const id = JSON.stringify(product_id)
    const end_product = { name, price, description, sku, img, stock, timestamp , _id: id.replace(/"/g,"")}

    return end_product ? { done: true, result: end_product }
                   : { done: false, result: this.on.notFound.product }
  }

  update = (product_id) => {


    const index = this.getIndex(id).result
    productObj.timestamp = Date.now()

    const newProduct = {
      ...this.data[index],
      ...productObj
    }

    const msg = saveProduct(newProduct)
    this.syncLocalData(this.conexion)

    return msg.done ? {
      done: msg.done,
      result: this.on.modified.success
    } : {
      done: msg.done,
      result: `${this.on.modified.fail} : ${msg.result}`
    }
  }

  async delete (product_id = false) {
    
    if (typeof product_id !== 'number') {
      try {
        await this.client.connection.db.dropCollection(config.container.collection.cart)
        delete this.data;
        return {done: true, result: this.on.deleted.success}
      } catch (error) {
        return {
          done: false,
          result: `${this.on.deleted.fail} : ${error}`
        }
      }
      
    }

    const index = this.getIndex(product_id)
    if (typeof index !== 'number') return {done: false, result: this.on.notFound.product}

    delete this.data[index]
    try {
      await model.find({ _id: product_id }).remove().exec();
      return { done: true, result: this.on.deleted.success }
    } catch (error) {
      return { done: false, result: this.on.deleted.fail + error }
    }
  }
}

module.exports = Cart