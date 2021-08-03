const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        mensaje: String,
        producto: [Producto]
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

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.use(express.static('public'));
app.listen(8080, () => {console.log("Servidor funcionando")});