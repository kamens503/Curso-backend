


const express = require('express'),
      app = express(),
      port = 8080 || process.env.port;

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.set('views','./views');

app.set('view engine','ejs');

app.get('/hello', (req, res) => {
    res.render('layout.ejs',{message : "Hello EJS"})
})

// app.get('/datos', (req, res) => {
//     console.log(req.query); 
//     res.render('nivel.pug',req.query)
// })


app.use(express.static(__dirname + "/public"));
app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`)
}).on('error', e => {
    console.log(e);
});