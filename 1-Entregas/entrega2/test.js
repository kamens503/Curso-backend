const Contenedor = require('./Contenedor');

const contenedor = new Contenedor('prueba')

contenedor.save({
    title: 'prueba',
    price: 5000,
    thumbnail : 'https://grupoact.com.ar/wp-content/uploads/2020/04/placeholder.png'
});

contenedor.save({
    title: 'prueba2',
    price: 5000,
    thumbnail : 'https://grupoact.com.ar/wp-content/uploads/2020/04/placeholder.png'
});

contenedor.save({
    title: 'prueba3',
    price: 5600,
    thumbnail : 'https://grupoact.com.ar/wp-content/uploads/2020/04/placeholder.png'
});

contenedor.save({
    title: 'prueba4',
    price: 2300,
    thumbnail : 'https://grupoact.com.ar/wp-content/uploads/2020/04/placeholder.png'
});

contenedor.deleteById(1);
console.table(contenedor.getAll()); 
contenedor.deleteAll();