const { default: knex } = require('knex');
const { send } = require('process');

const express = require('express'),
    //Server
    {Server:HttpServer} = require('http'),
    {Server:IOServer} = require('socket.io'),
    app = express(),
    httpServer = new HttpServer(app),
    io = new IOServer(httpServer),
    port = 8080 || process.env.port,
    //DB
    KnexDB = require('./controllers/KnexDB')
    chatDB = new KnexDB(require('./options/sqlite').options),
    productDB = new KnexDB(require('./options/mariaDB').options),
    //Controllers
    Products = require('./controllers/Products.js'),
    Chat = require('./controllers/Chat.js');


    app.use(express.json());
    app.use(express.urlencoded({extended : true}));


    const productos = new Products(productDB);
    const chat = new Chat(chatDB); 



app.set('views','./views');
app.set('view engine','ejs');

app.get('/', (req, res) => {
    productos.getAll().then(r => {
        console.log(r);
    res.render('index.ejs',{data: r.result, status:''})
    });  
})

app.use(express.static(__dirname + "/public"));
httpServer.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`)
  }).on('error', e => {
      console.log(e);
  });


// TEST
app.get('/test', (req,res) => {
    chat.getAll().then(r => {
        console.log(r);
        res.status(r.status).send(r.result)
    }); 
})

app.post('/test', (req,res) => {
    chat.create(req.body).then(r => {
        console.log(r);
        res.status(r.status).send(r.result)
    }); 
})

io.on('connection', socket => {
    //CHAT
    chat.getAll().then(r => {
        console.log('Usuario conectado');
        console.log({r});
        socket.emit('render_history',r.result);

    })
    .catch(e => {
        console.log({e});
    })
    socket.on('message_send', data =>{
        chat.create(data).then( r => {
            console.log('Mensaje nuevo guardado');
            console.log({r});
            return chat.getAll()
        }).then(r => {
            io.sockets.emit('render_history',r.result)
            socket.emit('render_history',r.result)
        })
        .catch(e => {console.log(e)})
    })

    //PRODUCT
    socket.on('add_product', data =>{
        productos.create(data)
            .then(() => productos.getAll())
            .then(r => {
                console.log('Added Product result ');
                console.log({r});
                io.sockets.emit('product_added',{ products: r.result})
                socket.emit('product_added',{products:  r.result, success: 'Cargado con éxito'})
            })
            .catch(e => {
                socket.emit('product_added',{products: false, success: e.result})
            })
        
    })

    socket.on('delete_product', data => {
        console.log(data.id);
        productos.delete(data.id)
        .then(r => {
            console.log('Delete Product result ');
            console.log(r);
            return productos.getAll()
        })
        .then(r => {
            console.log({r});
            io.sockets.emit('product_deleted',{ products: r.result})
            socket.emit('product_deleted',{products:  r.result, success: 'Producto borrado'})
        })
        .catch(e => {
            socket.emit('product_added',{products: false, error: e.result})
        })
    })
});