const mongoose = require('mongoose'),
      model = require('./models/product.model.js'),
      { container } = require('../../config'),
      host = container.mongodb.host

class Product {
	constructor(id = false) {
		this.id = id
    if (!id) {
      throw 'Error: Invalid mongodb id path'
    }

		this.on = {
			denied: 'No tienes permiso para hacer esta acción',
			modified: {
				success: 'Datos cargado con éxito',
				fail: 'Algo salió mal! Carga incorrecta, verifique los datos pruebe nuevamente',
			},
			deleted: {
				success: 'Datos borrados con éxito',
				fail: 'Algo salió mal! No se pude borrar',
			},
			notFound: 'Producto no encontrado',
			default: {
				success: 'Acción realizada con éxito',
				fail: 'Algo salió mal! Prueba nuevamente',
			},
		};
		this.template = {
			id: 0,
			timestamp: Date.now(),
			name: '',
			description: '',
			sku: 0,
			img: '',
			price: 0,
			stock: 0,
		};
	}

  async init() {
    console.log('[Mongoose connection] Product');
    try {
      this.client = mongoose
      this.db = this.client.connect(host)
      this.model = model

      return {done: true, result: 'Connect to mongoose database'}

    } catch (error) {
      return {done: false, result: 'Failed to connect'}
    }
  }

  async syncLocalData() {
    
    try {
      this.data = await this.model.find().exec()
      return {done: true, result: 'Synced'}
    } catch (e) {
        console.log(e);
        return {done: false, result: 'Synced'}
    }
}
  
  async disconnect(){
    try {
      await this.client.disconnect()

      return {done: true, result: 'Disconnected from mongoose'}
    } catch (error) {
      return {done: false, result: `Couldnt disconnect: ${error}`}
    }
  }

	async saveProduct(product) {
    const new_product = new this.model(product)
    let loaded_product
    try {
      loaded_product = await new_product.save()
      
    } catch (error) {
        console.log(error);
        return {done: false, result: error}
    }
    await this.syncLocalData()
    return {done: true, result: loaded_product}
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
    this.data = await this.syncLocalData()

    return msg.done ? {
      done: msg.done,
      result: msg.result
    } : {
      done: false,
      result: `${this.on.modified.fail} : ${msg.result}`
    }

  }

  get = async (product_id = -1) => {
    await this.syncLocalData()
    const result = product_id != -1 
                  ? {
                    done: true,
                    result: this.data.find(product => product?._id == product_id)
                  } 
                  : {
                    done: true,
                    result: this.data
                  }

    if (!result.result) {
      return {
        done: false,
        result: `${product_id} ${this.on.notFound}`
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

  getProductByIndex = (index) => {
    const {name, price, description, sku, img, stock, timestamp, _id: product_id} = this.data[index]
    const id = JSON.stringify(product_id)
    const end_product = { name, price, description, sku, img, stock, timestamp , _id: id.replace(/"/g,"")}

    return end_product ? { done: true, result: end_product }
                   : { done: false, result: this.on.notFound.product }
  }

  async update (product_id, productObj) {


    const index = this.getIndex(product_id).result
    productObj.timestamp = Date.now()

    const newProduct = {
      ...this.data[index],
      ...productObj
    }

    const msg = await this.saveProduct(newProduct)
    this.syncLocalData()

    return msg.done ? {
      done: msg.done,
      result: msg.result
    } : {
      done: msg.done,
      result: `${this.on.modified.fail} : ${msg.result}`
    }
  }

  async delete (product_id = -1) {
    
    if ( product_id == -1) {
      try {
        await mongoose.connection.db.dropCollection(collection)
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
      await this.model.find({ _id: product_id }).remove().exec();
      return { done: true, result: this.on.deleted.success }
    } catch (error) {
      return { done: false, result: this.on.deleted.fail + error }
    }
  }

}

module.exports = Product;
