const admin = require("firebase-admin"),
      serviceAccount = require("./accountKey"),
      test_key = require('./firebase_key.json'),
      { v4: uuidv1 } = require('uuid')

admin.initializeApp({
  credential: admin.credential.cert(test_key)
});

class Cart {
  constructor(name = false) {
    if (typeof name !== 'string') {
      throw 'Error: Invalid collection name'
    }
		this.name = name
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
    this.db
    this.collection
    this.data = []
  }

  async init() {
    try {
      this.db =  admin.firestore()
      this.collection = this.db.collection(this.name)
      await this.syncLocalData()

      return { done: true, result: 'Cart init sucessfully'}
    } catch (error) {
      return { done: false, result: error}
    }
    
  }

  async syncLocalData() {
    
      try {
        const raw_data = await this.collection.get()
        raw_data.forEach( doc => this.data.push(doc.data()))
        this.data.sort( (a, b) => a.timestamp > b.timestamp)
        return true
      } catch (e) {
          console.log(e);
          return false
      }
  }

  disconnect(){
    return {done: true, result: 'No need to disconnect from firebase'}
  }

  async saveProduct(product) {
    const new_product = product
    new_product.id = uuidv1()
    try {
      await this.collection.doc(new_product.id).set(new_product)
      
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
                    result: this.data.find(product => product?.id === product_id)
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
    const result       = this.data.findIndex(product => product.id == id)
    return result
  }

  getProductByIndex = (index) => {
    const end_product = this.data[index]
    return end_product ? { done: true, result: end_product }
                   : { done: false, result: this.on.notFound.product }
  }

  async update (product_id, productObj) {
    const index = this.getIndex(product_id)
    productObj.timestamp = Date.now()

    const newProduct = {
      ...this.data[index],
      ...productObj
    }

    const msg = await this.saveProduct(newProduct)

    return msg.done ? {
      done: msg.done,
      result: this.on.modified.success
    } : {
      done: msg.done,
      result: `${this.on.modified.fail} : ${msg.result}`
    }
  }

  async delete (product_id = -1) {
    
    if ( product_id <= -1) {
      console.log('Deleteng alll');
      try {
        const documents = await this.collection.get()
        const batch = this.db.batch();
        documents.docs.forEach(doc => {
          batch.delete(doc.ref)
        });
        await batch.commit()
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
      await this.collection.doc(product_id).delete();
      return { done: true, result: this.on.deleted.success }
    } catch (error) {
      return { done: false, result: this.on.deleted.fail + error }
    }
  }
}

module.exports = Cart