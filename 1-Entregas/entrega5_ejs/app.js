const express = require('express'),
      { Router } = express,
      api = Router(),
      Contenedor = require('./Contenedor.js'),
      app = express(),
      port = 8080 || process.env.port;

const productos = new Contenedor('productos');

api.use(express.json());
api.use(express.urlencoded({extended : true}));

app.set('views','./views');
app.set('view engine','ejs');

app.get('/', (req, res) => {
    res.send(`<h1>Bienvenidos la entrega 5: La entrega es en: <a href="http://localhost:${port}/api/productos">http://localhost:${port}/api/productos</a></h1>`)
})

api.get('/productos', (req, res) => {
    console.log(productos.data);
    const data = productos.data;
    delete data.objects
    res.render('product_list.ejs',{data})

});

api.get('/subir_productos', (req, res) => {
    data= '';
    res.render('cargar_producto.ejs',{data})

});

api.get('/subir_productos/:status', (req, res) => {
    console.log(req.params);
    let data = {};
    switch (req.params.status) {
        case "no_title":
            data = "Error: Falta título"
            break;
        case "no_price":
            data = "Error: Falta precio"
            break;
        case "no_img":
            data = "Error: Falta imagen"
            break;
        case "cargado":
            data = "Producto cargado con exito"
            break;
        default:
            break;
    }
    res.render('cargar_producto.ejs',{data})

});
api.get("/productos/:id", (req, res) => {

    // console.log(req);
    const key =  req.params.id;
    console.log(productos.getById(key));
    const data = {};
    data.a = productos.getById(key);
    res.render('product_list.ejs',{data})
});


api.post('/productos', (req, res) => {

    console.log(req.body);
    let product = {};
    
    product.title = req.body.title ? req.body.title 
                                    : res.redirect("api/subir_productos/no_title");

    product.price = req.body.price ? req.body.price 
                                    : res.redirect("api/subir_productos/no_price");

    product.thumbnail = req.body.thumbnail ? req.body.thumbnail 
                                            : res.redirect("api/subir_productos/no_img");

    productos.save(product);

    console.log("Producto creado");
    res.redirect("api/subir_productos/cargado");
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