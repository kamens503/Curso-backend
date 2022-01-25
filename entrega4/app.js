const express = require('express'),
      { Router } = express,
      api = Router(),
      Contenedor = require('./Contenedor.js'),
      app = express(),
      port = 8080 || process.env.port;

const productos = new Contenedor('productos');

app.get('/', (req, res) => {
    res.send(`<h1>Bienvenidos la entrega 4</h1>`)
})

api.get('/productos', (req, res) => {
    console.log(productos.data);
    let HTML = "";
    const data = productos.data;
    Object.keys(data).forEach((key,index ) => {
        if(key != "objects"){
            HTML += `<div style="width:350px; height:400; display: inline-block;padding:10px 15px;background:#FAFAFA;margin: 0 10px">`;
            HTML += `<img src="${data[key].thumbnail}" style="width:100%;height:200px;object-fit:cover">`
            HTML += `<h3>${data[key].title}</h3>`;
            HTML += `<h1>$${data[key].price}</h1>`;
            HTML += `</div>`;
        }
    });
    
    res.send(HTML)
});

api.get("/productos/:id", (req, res) => {

    // console.log(req);
    const key =  req.params.id;
    console.log(productos.getById(key));
    const data = productos.getById(key);

    let     HTML = `<div style="width:350px; height:400; display: inline-block;padding:10px 15px;background:#FAFAFA;margin: 0 10px">`;
            HTML += `<img src="${data.thumbnail}" style="width:100%;height:200px;object-fit:cover">`
            HTML += `<h3>${data.title}</h3>`;
            HTML += `<h1>$${data.price}</h1>`;
            HTML += `</div>`;
    res.send(HTML);
});

 api.use(express.json());
 api.use(express.urlencoded({extended : true}));

api.post('/productos', (req, res) => {

    console.log(req.body);
    let product = {};
    
    product.title = req.body.title ? req.body.title 
                                    : res.status(404).send("Faltó el título");

    product.price = req.body.price ? req.body.price 
                                    : res.status(404).send("Faltó el precio");

    product.thumbnail = req.body.thumbnail ? req.body.thumbnail 
                                            : res.status(404).send("Faltó el url de la imagen");

    productos.save(product);

    console.log("Producto creado");
    res.send(product)
});


api.put('/productos/:id', (req, res) => {
    const id =req.params.id,
          product = productos.getById(id);
    
    console.log(req.query);
    
    if(!product) res.status(404).send("No se consiguió el producto");

    product.title = req.query.title ?  req.query.title : product.title;
    product.price = req.query.price ?  req.query.price : product.price;
    product.thumbnail = req.query.thumbnail ?  req.query.thumbnail : product.thumbnail;

    productos.edit(id,product);
    console.log("Producto actualizado");
    res.send(product)
});


api.delete('/productos/:id', (req, res) => {
    console.log(req.params);
    const id =req.params.id,
          product = productos.getById(id);

    if(!product) res.status(404).send("No se consiguió el producto");

    productos.deleteById(id);

    res.status(200).send("Producto Borrado con éxito");
});
app.use(express.static(__dirname + "/public"));
app.use("/api", api);
app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`)
  }).on('error', e => {
      console.log(e);
  });