const express = require('express'),
      { Router } = express,
      api = Router(),
      Contenedor = require('./Contenedor.js'),
      app = express(),
      port = 8080 || process.env.port;


function getRandomArbitrary(min, max) {
return Math.floor(Math.random() * (max - min) + min);
}

const productos = new Contenedor('productos');

app.get('/', (req, res) => {
    let HTML = `<h1>Bienvenidos la entrega 3</h1>`;
        HTML += `<a href="/productos">Obtener productos</a><br>`;
        HTML += `<a href="/productoRamdom">Obtener producto ramdom</a><br>`;
    res.send(HTML)
})

api.get('/productos', (req, res) => {
    // console.log(productos.data)
    const data = productos.data;
    res.send(data)
});

api.get("/productoRamdom", (req, res) => {

    const id =  getRandomArbitrary(1, 4);
    console.log(id);
    console.log(productos.getById(id));
    const data = productos.getById(id);
    res.send(data);
});

api.use(express.json);

api.use(express.urlencoded({extended : true}))

api.put('/productos', (req, res) => {

    console.log("Prueba Put");
    res.send()
});
app.use(express.static(__dirname + "/public"));
app.use("/api", api);
app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`)
  })