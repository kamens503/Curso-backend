class Cart {
    constructor (id, user) {
        this.user = user
       this.id = id
       this.fs = require('fs')
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
            notFound: "Producto no encontrado",
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
       this.data = this.getFile (`./${id}_${user}.txt`)
    }
    getFile (path) {
        if(!this.fs.existsSync(path)) {
            this.fs.writeFileSync(path,JSON.stringify({ idPool: 0, products: [] }))
        }
        return JSON.parse(this.fs.readFileSync(path, 'utf-8'))
    }
    rewrite = () => {
        try {
            this.fs.writeFileSync(`./${this.id}_${this.user}.txt`,JSON.stringify(this.data))
            return {done: true, result: this.on.default.success}
        } catch (error) {
            console.log(error);
            return {done: false, result: `Algo salió mal! No se pudo sobreescribir el archivo ${error}`}
        }
    } 

    isPossible = (can, id = false) => {
        const exist =this.data.products.find(product => product.id === id) ? this.data.products.find(product => product.id === id) : false
        console.log({exist: exist});
        if (id && !exist || exist && undefined) {
            return false
        }
        return can ? true : this.on.denied
    }

    create = (can, product) =>{
        if(!this.isPossible(can) === true) return this.isPossible(can,id)
        const id = this.data.idPool++

        product.id = id
        product.timestamp = Date.now()

        const newProduct = {...this.template, ...product }
        this.data.products.push(newProduct)

        const msg = this.rewrite()
        return msg.done ? {done: msg.done , result: this.on.modified.success}
                    : {done: msg.done, result: msg.result}

    }
    
    get = (can, id=false) =>{

        if(!this.isPossible(can,id) === true) return {done: false, result: this.isPossible(can,id)} 
        const result = id ? {done: true, 
                             result: this.data.products.find(product => product.id === id) }
                          : {done: true, result: this.data.products }
        return result
    }

    getIndex = (id) =>{
        const result = this.data.products.findIndex(product => product.id === id)
        return result
    }

    update = (can, id, productObj) =>{
        if(!this.isPossible(can,id) === true) return this.isPossible(can,id)

        const index = this.getIndex(id).result
        console.log(index);
        productObj.timestamp = Date.now()

        this.data.products[index] = {...this.data.products[index], ...productObj }

        console.log(this.data.products[index]);


        const msg = this.rewrite()
        return msg.done ? {done: msg.done , result: this.on.modified.success}
                    : {done: msg.done, result: msg.result}
    }

    delete = (can, id=false) => {
        console.log({can, id});
        

        if(id === 'ALL') {
            try {
                this.fs.unlink(`./${this.filename}.txt`);
                delete this.data;
                return this.on.deleted.success
                
            } catch (error) {
                return this.on.deleted.fail
            }
        }
        if(!this.isPossible(can,id) === true) return this.isPossible(can,id)
        console.log({index: this.getIndex(id), data: this.data.products[this.getIndex(id)]});
        delete this.data.products[this.getIndex(id)]
        const msg = this.rewrite()
        return msg.done ? {done: true, result: this.on.deleted.success} : {done: false, result: this.on.deleted.fail}
    }
}

module.exports = Cart

