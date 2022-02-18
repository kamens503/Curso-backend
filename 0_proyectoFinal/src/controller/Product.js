class Product {
     constructor (filename) {
        this.filename = filename
        this.fs = require('fs')
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
        this.template = {
            id: 0,
            timestamp: 0,
            name: '',
            description: '',
            sku: 0,
            img: '',
            price: 0,
            stock: 0
        }
        this.data = this.getFile (`./${filename}.txt`)
    }
    getFile (path) {
        if(!this.fs.existsSync(path)) {
            this.fs.writeFileSync(path,JSON.stringify({ idPool: 0, products: [] }))
        }
        return JSON.parse(this.fs.readFileSync(path, 'utf-8'))
    }
    rewrite = () => {
        try {
            this.fs.writeFileSync(`./${this.filename}.txt`,JSON.stringify(this.data)); 
        } catch (error) {
          console.error(`No se pudo reescribir archivo: ${error}`);  
        }
    } 

    isPossible = (can, id = false) => {
        let possible = false
        if (id) {
            possible = this.data.products[id] ? true : this.on.notFound
        }
        possible = can ? true : this.on.denied
        return possible
    }

    create = (can, product) =>{
        if(!this.isPossible(can) === true) return this.isPossible(can,id)
        const id = this.data.idPool++
        product.id = id
        product.timestamp = Date.now()
        let productPos = this.data.products.push(this.template)
        this.data.products[--productPos].id = id
        
        return this.update(can, product)

    }

    get = (can, id=false) =>{
        if(!this.isPossible(can,id) === true) return this.isPossible(can,id)

        return id ? this.data.products[id] : this.data.products
    }

    update = (can, product) =>{
        if(!this.isPossible(can,product.id) === true) return this.isPossible(can,id)


        let error = false;
        this.data.products[product.id] = {}
        Object.keys(product).forEach( i => {
            let prop = i in this.template ? product[i] : false;
            if (!prop && prop !== 0) { error = true; return } 
            this.data.products[product.id][i] = prop
        })

        if (error) return this.on.modified.fail
        this.rewrite()
        return this.on.modified.success
    }

    delete = (can, id=false) => {
        if(!this.isPossible(can,id) === true) return this.isPossible(can,id)

        if(id === 'ALL') {
            try {
                this.fs.unlink(`./${this.filename}.txt`);
                delete this.data;
                return this.on.deleted.success
                
            } catch (error) {
                return this.on.deleted.fail
            }
        }
        delete this.data[id]
        this.rewrite()
        return this.on.deleted.success
    }
}

template = {
    id: 0,
    timestamp: 0,
    name: '',
    description: '',
    sku: 0,
    img: '',
    price: 0,
    stock: 0
}

module.exports = Product