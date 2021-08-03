async function sendQueryGraphQL(query, variables) {
    try {
        let r = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables 
            })
        })
        let {data} = await r.json()
        console.log(`Pruebaa ${data}`)
        return data
    }
    catch(error) {
        console.error(error)
    }
}

async function getMensaje() {
    let data = await sendQueryGraphQL('{mensaje}')
    document.querySelector('h1').innerHTML = data.mensaje
}

// async function getProductos() {
//     let data = await sendQueryGraphQL('{productos}')
//     document.querySelector('h1').innerHTML = data.mensaje
// }

function setListeners() {
    document.querySelector('form').addEventListener('submit', async e => {
        e.preventDefault()

        let nombre = document.querySelectorAll('input')[0].value
        let precio = document.querySelectorAll('input')[1].value
        let descripcion = document.querySelectorAll('input')[2].value
        let codigo = document.querySelectorAll('input')[3].value
        let foto = document.querySelectorAll('input')[4].value
        let stock = document.querySelectorAll('input')[5].value
        let id = document.querySelectorAll('input')[6].value

        document.querySelectorAll('input').forEach(input => {
            input.value = ''  
        })
        
        // document.querySelectorAll('input')[1].value = ''
        // document.querySelectorAll('input')[2].value = ''

        const producto = {nombre, precio, descripcion, codigo, foto, stock, id}
        console.log(producto)


        const query = `
        mutation guardarProducto($nombre: String!, $precio: String!, $descripcion: String!, $codigo: String!, $foto: String!, $stock: String!, $id: String!) {
            guardarProducto(nombre: $nombre, precio: $precio, descripcion: $descripcion, codigo: $codigo, foto: $foto, stock: $stock, id: $id) {
                ... productosFields
            }
        }
        fragment productosFields on Producto {
            nombre
            precio
            descripcion
            codigo
            foto
            stock
            id
        }`
        const variables = producto

        let rta = await sendQueryGraphQL(query,variables)
        console.log(`prueba2 ${rta}`)
        return rta
    })

    document.querySelector('a').addEventListener('click', async e => {
        e.preventDefault()

        let data = await sendQueryGraphQL(`
        {
            productos {
                nombre
                precio
                descripcion
                codigo
                foto
                stock
                id
            }
        }        
        `)
        console.log(data)
        document.querySelector('pre').innerText = JSON.stringify(data.productos,null,2)
    })
}

function start() {
    setListeners()
    getMensaje()
}

start()