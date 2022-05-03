
class Products {
    constructor (db) {
        this.db = db
        this.table = {
            name : 'products',
            schema : (table) => {
                table.increments('id').primary()
                table.string('title')
                table.string('thumbnail')
                table.float('price')
            }
        }

        this.on = {
            modified: {
                success: "Datos cargado con éxito",
                fail: "Algo salió mal! Carga incorrecta, verifique los datos pruebe nuevamente"
            },
            deleted: {
                success: 'Datos borrados con éxito',
                fail: 'Algo salió mal! No se puede borrar',
                notId: 'Id incorrecto o inexistente'
            },
            notFound: "Producto no encontrado",
            default: {
                success: 'Acción realizada con éxito',
                fail: 'Algo salió mal! Prueba nuevamente'
            }
        }

        this.init()

    }

    
    async init() {
        await this.db.use(this.table)
    }
    async create ({title, thumbnail, price}) {
        if (!title && !thumbnail && !price) return { status: 400, result: this.on.modified.fail }

        const msg = await this.db.create({title, thumbnail, price})

        return msg.success ? { status: 200, result: this.on.modified.success }
                           : { status: 500, result: msg.result } 

    }
   
    async getAll() {
        const res = await this.db.getAll()
        return res.success ? { status: 200, result: res.result}
                           : { status: 500, result: res.result}
    }

    async get( id ) {
        const res = await this.db.get(id)
        return res.success ? { status: 200, result: res.result}
                           : { status: 500, result: res.result}
    }
                

   getIndex = (id) =>{
       const result = this.data.products.findIndex(product => product?.id === id)
       return result
   }

   async update (id, obj) {

        if (!obj && !id) return { status: 400, result: this.on.modified.fail }
        const query = {}
        if (obj.title) { query.title = obj.title}
        if (obj.thumbnail) { query.thumbnail = obj.thumbnail}
        if (obj.price) { query.title = obj.price}

        const res = await this.db.update(id, query)

        return res.success ? { status: 200, result: res.result}
                           : { status: 500, result: res.result}


   }

   async delete ( id ) {

        if(!id) return { status: 400, result: this.on.deleted.notId }

        const res = await this.db.delete(id)

        return res.success ? { status: 200, result: this.on.deleted.success}
                           : { status: 500, result: res.result}
      
   }
}

module.exports = Products