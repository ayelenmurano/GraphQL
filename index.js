const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
var CircularJSON = require('circular-json');

const schema = buildSchema(`
    type Query {
        mensaje: String,
        productos: [Producto]
    }
    type Mutation {
        guardarProducto(nombre: String!, precio: String!, descripcion: String!, codigo: String!, foto: String!, stock: String!, id: String!): Producto
    }
    type Producto {
        nombre: String,
        precio: String,
        descripcion: String,
        codigo: String,
        foto: String,
        stock: String,
        id: String
    }
`)

const productos = [];

const guardarProducto = ({nombre, precio, descripcion, codigo, foto, stock, id}) => {   
    let producto = {nombre, precio, descripcion, codigo, foto, stock, id};
    console.log(`Producto index.js ${producto}`)
    productos.push(producto);
    console.log(`Productos index.js ${JSON.stringify(productos)}`)
    return producto;
}

const root = {
    mensaje: () => 'GrapQL: Ingrese Articulo',
    productos: () => productos,
    guardarProducto: guardarProducto
}

const app = express();

app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

const routerProduct = require('./src/routes/routesProduct.js');

app.put('/productos/:id', function (req,res) {
    var id = req.params.id;
    const productoAReemplazar = req.body;
    //console.log(`prpductoareempalzar ${CircularJSON.stringify(req)}`)

    for (let i in productos) {
        if (productos[i].id == id){
            productos.splice(i,1,productoAReemplazar)
        }
    }
    res.json({items: productos})
})


app.delete('/productos/:id', function (req,res) {
    var id = req.params.id;

    for (let i in productos) {
        if (productos[i].id == id){
            productos.splice(i,1)
        }
    }
    res.json({items: productos})
})


app.use(express.static('public'));
app.listen(8080, () => {console.log("Servidor funcionando")});