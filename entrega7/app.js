const { log } = require('console');

const express = require('express'),
    {Server:HttpServer} = require('http'),
    {Server:IOServer} = require('socket.io'),
    Contenedor = require('./Contenedor.js'),
    app = express(),
    httpServer = new HttpServer(app),
    io = new IOServer(httpServer),
    port = 8080 || process.env.port;

const productos = new Contenedor('productos');
const chat = new Contenedor('chat'); 


app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.set('views','./views');
app.set('view engine','ejs');

app.get('/', (req, res) => {
    console.log(productos.data);
    const data = productos.data;
    // delete data.objects
    res.render('index.ejs',{data, status:''})
})

app.use(express.static(__dirname + "/public"));
httpServer.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`)
  }).on('error', e => {
      console.log(e);
  });

io.on('connection', socket => {

//CHAT
console.log('Usuario conectado');
const _data = chat.data
// delete _data.objects
socket.emit('render_history',_data);
socket.on('message_send', data =>{
    console.log(data);
    chat.save(data);
    const _data = chat.data
    // delete _data.objects
    io.sockets.emit('render_history',_data)
    socket.emit('render_history',_data)
})

//PRODUCT
socket.on('add_product', data =>{
    console.log(data);
    if(data.title && data.thumbnail && data.price){
        productos.save(data)
        const _product = productos.data
        // delete _product.objects
        io.sockets.emit('product_added',{ products: _product})
        socket.emit('product_added',{products: _product, success: 'Cargado con éxito'})
    }else{
        socket.emit('product_added',{error: 'Error: Faltaron datos'})
    }
    
})

socket.on('delete_product', data => {
    console.log(data);
    productos.deleteById(data.id);
    const _product = productos.data
    io.sockets.emit('product_deleted',{ products: _product})
    socket.emit('product_deleted',{products: _product, success: 'PRODUCTO BORRADO'})
})
});