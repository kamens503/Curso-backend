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
    delete data.objects
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
socket.emit('render_history',chat.data);
socket.on('message_send', data =>{
    console.log(data);
    chat.save(data)
    io.sockets.emit('render_history',messages)
    socket.emit('render_history',messages)
})

//PRODUCT
socket.emit('render_products', productos.data);
socket.on('add_product', data =>{
    console.log(data);
    if(data.title && data.thumbnail && data.price){
        product.save(data)
        io.sockets.emit('product_added',{ id:data.id})
        socket.emit('product_added',data.id)
    }else{
        socket.emit('product_added',{error: 'Error: Faltaron datos'})
    }
    
})
});