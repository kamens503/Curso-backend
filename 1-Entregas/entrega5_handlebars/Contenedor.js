class Contenedor {
    constructor (filename) {
        this.filename = filename;
        this.fs = require('fs');

        if(this.fs.existsSync(`./${filename}.txt`)){

            try {
                this.data =JSON.parse(this.fs.readFileSync(`./${filename}.txt`, 'utf-8'));
                console.log(`Status : Archivo existente, abriendo archivo ${filename}.txt`);
            } catch (error) {
                console.error(`No se pudo leer archivo: ${error}`);  
            }

        }else{
            this.data = {
                objects : 0
            }
            try {
                this.fs.writeFileSync(`./${this.filename}.txt`,JSON.stringify(this.data)); 
            } catch (error) {
              console.error(`No se pudo reescribir archivo: ${error}`);  
            }
        }

    }

    rewritre() {
        try {
            this.fs.writeFileSync(`./${this.filename}.txt`,JSON.stringify(this.data)); 
        } catch (error) {
          console.error(`No se pudo reescribir archivo: ${error}`);  
        }
    }

    async save(object){
        let id = ++this.data.objects;
        this.data[id] = object;
        await this.rewritre();
        console.log(`Objecto ${id} añadido a ${this.filename}.txt`);
        return id;
    }

    async edit(id,object){
        this.data[id] = object;
        await this.rewritre();
        console.log(`Objecto ${id} editado en ${this.filename}.txt`);
        return id;
    }

    getById(id){
        return this.data[id];
    }

    getAll(){
        return this.data;
    }

    async deleteById(id){
        if(this.data[id]){
            this.data.objects --;
            this.data[id] = '';
            delete this.data[ id ];
            await this.rewritre();
            console.log(`Borrado el objeto ${id} de ${this.filename}.txt`); 
            return true
        }
        console.error(`Producto no encontrado`);
    }

    async deleteAll(cb){
        delete this.data;
        try {
            await this.fs.promises.unlink(`./${this.filename}.txt`);
            
        } catch (error) {
            console.error(`No se pudo borrar archivo : ${error}`);
        }
    }
}

module.exports = Contenedor;