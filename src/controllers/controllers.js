module.exports = {

    actualizar: (req, res)=>{
        let req2 = req;
        console.log(`Productos desde controllers ${JSON.stringify(req2,null,2)}`)
        // loggs.debug('request recibido');
        // var longitud = productos.length;
        // var id = req.params.id;
        // var actualizar = req.body
    
        // if ( id > longitud || id < 1){
        //     res.json ({error:'producto no encontrado'})
    
        // } else {
    
        // productos[id-1] = actualizar
        // var producto = productos[id-1]
        // product.escribir(productos)
    
        res.json({items: 'holagola'})

    },

    borrar: async (req, res)=>{

        // const producto = await product.borrar(req.params.id)
    
        res.json({items: producto})
    }
}

