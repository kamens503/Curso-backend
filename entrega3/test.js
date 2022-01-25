const Contenedor = require('./Contenedor');

const contenedor = new Contenedor('productos')

contenedor.save({
    title: 'Manzana',
    price: 5000,
    thumbnail : 'https://grupoact.com.ar/wp-content/uploads/2020/04/placeholder.png'
});

contenedor.save({
    title: 'Pera',
    price: 5000,
    thumbnail : 'https://grupoact.com.ar/wp-content/uploads/2020/04/placeholder.png'
});

contenedor.save({
    title: 'Patilla',
    price: 5600,
    thumbnail : 'https://grupoact.com.ar/wp-content/uploads/2020/04/placeholder.png'
});


// contenedor.deleteById(1);
console.table(contenedor.getAll()); 
// contenedor.deleteAll();