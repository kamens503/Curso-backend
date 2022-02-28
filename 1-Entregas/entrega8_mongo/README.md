# Base de datos Ecommerce

## Crear la base de datos o usarla en el caso que exista

    use ecommerce

## Crear tabla "chat" e insertar 10 documentos

    db.chat.insert([
        {
            "message": "Msg Prueba 1",
            "mail": "correo@gmail.com",
            "date": "27/1/2022 16:12"
        },
        {
            "message": "Msg Prueba 2",
            "mail": "correo@gmail.com",
            "date": "27/1/2022 16:12"
        },
        {
            "message": "Msg Prueba 3",
            "mail": "correo@gmail.com",
            "date": "27/1/2022 16:12"
        },
        {
            "message": "Msg Prueba 4",
            "mail": "correo@gmail.com",
            "date": "27/1/2022 16:12"
        },
        {
            "message": "Msg Prueba 5",
            "mail": "correo@gmail.com",
            "date": "27/1/2022 16:12"
        },
        {
            "message": "Msg Prueba 6",
            "mail": "correo@gmail.com",
            "date": "27/1/2022 16:12"
        },
        {
            "message": "Msg Prueba 7",
            "mail": "correo@gmail.com",
            "date": "27/1/2022 16:12"
        },
        {
            "message": "Msg Prueba 8",
            "mail": "correo@gmail.com",
            "date": "27/1/2022 16:12"
        },
        {
            "message": "Msg Prueba 9",
            "mail": "correo@gmail.com",
            "date": "27/1/2022 16:12"
        },
        {
            "message": "Msg Prueba 10",
            "mail": "correo@gmail.com",
            "date": "27/1/2022 16:12"
        },
        
    ])

## Crear tabla "productos" e insertar 10 documentos

    db.productos.insert([
        {
            "timestamp": 1645500411247,
            "name": "Producto 1",
            "description": "Descripción de producto",
            "sku": 1235,
            "img": "https://elegifruta.com.ar/onepage/wp-content/uploads/2017/07/manzana_roja.jpg",
            "price": 123,
            "stock": 5
        },
        {
            "timestamp": 1645500411247,
            "name": "Producto 2",
            "description": "Descripción de producto",
            "sku": 1235,
            "img": "https://elegifruta.com.ar/onepage/wp-content/uploads/2017/07/manzana_roja.jpg",
            "price": 280,
            "stock": 5
        },
        {
            "timestamp": 1645500411247,
            "name": "Producto 3",
            "description": "Descripción de producto",
            "sku": 1235,
            "img": "https://elegifruta.com.ar/onepage/wp-content/uploads/2017/07/manzana_roja.jpg",
            "price": 520,
            "stock": 5
        },
        {
            "timestamp": 1645500411247,
            "name": "Producto 4",
            "description": "Descripción de producto",
            "sku": 1235,
            "img": "https://elegifruta.com.ar/onepage/wp-content/uploads/2017/07/manzana_roja.jpg",
            "price": 348,
            "stock": 5
        },
        {
            "timestamp": 1645500411247,
            "name": "Producto 5",
            "description": "Descripción de producto",
            "sku": 1235,
            "img": "https://elegifruta.com.ar/onepage/wp-content/uploads/2017/07/manzana_roja.jpg",
            "price": 3054,
            "stock": 5
        },
        {
            "timestamp": 1645500411247,
            "name": "Producto 6",
            "description": "Descripción de producto",
            "sku": 1235,
            "img": "https://elegifruta.com.ar/onepage/wp-content/uploads/2017/07/manzana_roja.jpg",
            "price": 4015,
            "stock": 5
        },
        {
            "timestamp": 1645500411247,
            "name": "Producto 7",
            "description": "Descripción de producto",
            "sku": 1235,
            "img": "https://elegifruta.com.ar/onepage/wp-content/uploads/2017/07/manzana_roja.jpg",
            "price": 2300,
            "stock": 5
        },
        {
            "timestamp": 1645500411247,
            "name": "Producto 8",
            "description": "Descripción de producto",
            "sku": 1235,
            "img": "https://elegifruta.com.ar/onepage/wp-content/uploads/2017/07/manzana_roja.jpg",
            "price": 680,
            "stock": 5
        },
        {
            "timestamp": 1645500411247,
            "name": "Producto 9",
            "description": "Descripción de producto",
            "sku": 1235,
            "img": "https://elegifruta.com.ar/onepage/wp-content/uploads/2017/07/manzana_roja.jpg",
            "price": 123,
            "stock": 5
        },
        {
            "timestamp": 1645500411247,
            "name": "Producto 10",
            "description": "Descripción de producto",
            "sku": 1235,
            "img": "https://elegifruta.com.ar/onepage/wp-content/uploads/2017/07/manzana_roja.jpg",
            "price": 3350,
            "stock": 5
        },
    ])

## Listar todos los documentos

    db.productos.find()
    db.chat.find()

## Mostrar cantidad de documentos almacenados

    db.productos.estimatedDocumentCount()
    db.chat.estimatedDocumentCount()

## Alternativa para mostrar cantidad de documentos almacenados

>Hay alguna desventaja de usar este formato?
>Me parece mucho más práctico

    db.productos.count()
    db.chat.count()

# CRUD

## Agregar un producto nuevo

    db.productos.insert({
        "timestamp": 1645500411247,
        "name": "Producto 11",
        "description": "Descripción de producto",
        "sku": 1235,
        "img": "https://elegifruta.com.ar/onepage/wp-content/uploads/2017/07/manzana_roja.jpg",
        "price": 123,
        "stock": 5
    })

## Realizar una consulta

### I - Listar los productos con precio menor a 1000 pesos

    db.productos.find( { price: { $lt: 1000 } } )

### II - Listar los productos con precio entre 3000 a 1000 pesos

    db.productos.find({ 
        $and: [ 
            { price: { $gte: 1000 } },
            { price: { $lte: 3000 } }, 
        ]})

### III - Listar los productos con precio entre 3000 a 1000 pesos

    db.productos.find( { price: { $gt: 3000 } } )

### IV - Mostrar el nombre del tercer producto más barato

    db.productos.find( {}, {"name": 1}).sort({"price":1}).skip(2).limit(1)

## Actualizar todos los productos con el campo stock en valor 100

    db.productos.update(
        {}, 
        { $set: {stock: 100} },
        false,
        true
    )
