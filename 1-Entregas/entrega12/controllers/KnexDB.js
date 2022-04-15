class knexDB {
    constructor(options){
        this.knex = require('knex')(options)
        this.on = {
            table : {
                use : "DB está usando la tabla: ",
                created : "Tabla creada: "
            },
            data : {
                created : 'Elemento añadido a la tabla',
                updated : 'Elemento actualizado',
                deleted : 'Elemento borrado',
                notFound: 'Elemento no encontrado'
            },
            error : `Error, algo ha fallado: `
            
        }
    }

    async use (table) {
        const exist = await this.knex.schema.hasTable(table.name).then(r => r)
        if (!exist) {
           await this.knex.schema.createTable(table.name, (table.schema))
           console.log(this.on.table.created + table.name);
        }
        this.table = table.name
        console.log({ sucess: true, result: this.on.table.use + table.name });
        return { sucess: true, result: this.on.table.use + table.name }
    }

    async get (id) {
        const exist = await this.exist(id)
        if (!exist) return {success: false, result: this.on.data.notFound}

        try {
            const result = await this.knex(this.table).where({id: id})
            return {success: true, result: result}
        } catch(e) {
            return {success: false, result: this.on.error + e}
        }
        
    }

    async getAll () {
        try {
            const result = await this.knex(this.table)
            return {success: true, result: result}
        } catch(e) {
            return {success: false, result: this.on.error + e}
        }
    }

    async create (obj) {
        try {
            await this.knex(this.table).insert(obj)
            return {success: true, result: 'Objeto cargado con éxito'}
        } catch(e) {
            return {success: false, result: this.on.error + e}
        }
    }

    async exist(id) { return await this.knex(this.table).where({id: id}) || false }

    async update (id,obj) {
        const exist = await this.exist(id)
        if (!exist) return {success: false, result: this.on.data.notFound}

        try {
            await this.knex(this.table).where(id).update(obj)
            return {success: true, result: this.on.data.updated}
        } catch(e) {
            return {success: false, result: this.on.error + e}
        }
    }

    async delete (id) {
        const exist = await this.exist(id)
        if (!exist) return {success: false, result: this.on.data.notFound}
        
        try {
            await this.knex(this.table).where({id: id}).del()
            return {success: true, result: this.on.data.deleted}
        } catch(e) {
            return {success: false, result: this.on.error + e}
        }
    }

    async deleteTable () {

    } 
}

module.exports = knexDB