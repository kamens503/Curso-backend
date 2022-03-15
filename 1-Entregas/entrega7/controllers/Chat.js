
class Chat {
    constructor (db) {
        this.db = db
        this.table = {
            name : 'chat',
            schema : (table) => {
                table.increments('id').primary(),
                table.string('message').notNullable(),
                table.string('mail').notNullable(),
                table.string('date').notNullable()
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
    async create ({message, mail, date}) {
        if (!message && !mail && !date) return { status: 400, result: this.on.modified.fail }

        const res = await this.db.create({message, mail, date})

        return res.success ? { status: 200, result: this.on.modified.success }
                           : { status: 500, result: res.result } 

    }
   
    async getAll() {
        const res = await this.db.getAll()
        return res.success ? { status: 200, result: res.result}
                           : { status: 500, result: res.result}
    }
}

module.exports = Chat