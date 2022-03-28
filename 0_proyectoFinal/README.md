# Proyecto Final

## Segunda Entrega, objetivos

- Crear una API Rest para dos contenedores: Productos y Carrito
- Crear 3 controladores para manejar los datos: File / Firebase / MongoDb
- Usar DAO para abstraer la conexión entre los tipos de base de datos
- Usar un config.js para facilitar la configuración del servidor

## Middleware

---

### **accessControl :**

Checkea que el usuario tenga acceso a los request, en el caso de no ser así, el servidor responde con status: 403

### **[ controller ].init :**

Inicia el controlador antes de iniciar cualquier request

### **cart.assingCart :**

Ya que cada carrito es un documento diferente (O archivo, en el caso de file) se necesita asignar que documento se va utilizar antes de cualquier request

### **validateNewProduct :**

Verifica los datos sean del tipo correcto y que no falten, en el caso de que falten devuelve un objeto con el status de cada propiedad

### **validateProductChange :**

Verifica los datos sean del tipo correcto y devuelve un error en el caso que no sean

## Config

---

Localización :

    ./src/config.js

Se divide en 3 modulos:

### **endpoints :**

Devuelve un objeto con las rutas de los api endpoints para ser usado en el server.js

### **container :**

Devuelve un objecto con el tipo de contenedor que se va a usar (provider), y los datos básicos para hacer una conexión con todos los contenedores (Host, nombre de colección tanto para carros como para productos)

### **controller :**

Devuelve un objeto que contiene todas las clases de los controladores los cuales el DAO usará dependiendo del provider que se haya seleccionado en el controller

## DAO

---

Localización :

    ./src/dao.js

Devuelve instancias del controlador de producto y de carro dependiendo del provider que fué seleccionado

## Controllers

---

Localización :

    ./src/controller/[Provider]/[controller].js

Contiene las clases que controlan como se cargan los productos a los contenedores

## APIS

---

Localización :

    ./src/routers/[ Type ].js

### **Productos**

Ruta de la API:

    localhost:{PORT}/api/productos

**GET '/':** Devuelve Array de productos en formato JSON

**GET '/:productId/':** Devuelve producto en formato JSON

**POST '/':** Añade producto, devuelve el producto creado
-Necesitas pasar los datos del producto desde el body en formato JSON

**PUT '/:productId':** Modifica producto, devuelve el product modificado
-Necesitas pasar los datos del producto desde el body en formato JSON

**DELETE '/:productId':** Borra el producto, devuelve mensaje del resultado

---

### **Carrito**

Ruta de la API:

    localhost:{PORT}/api

**POST '/':** Crea un carrito y devuelve el id del carro creado

**GET '/:cartId/productos':** Devuelve Array de productos del carrito en formato JSON

**GET '/:cartId/productos/:productId':** Devuelve producto en formato JSON

**POST '/:cartId/productos':** Añade producto al carrito, devuelve el producto creado

-Necesitas pasar los datos del producto desde el body en formato JSON

**DELETE '/:cartId':** Borra el carrito, devuelve mensaje del resultado

**GET '/:cartId/productos/:productId':** Borra producto del carrito, devuelve mensaje del resultado
