module.exports = function (app, gestorBD) {

    app.post("images/likes/:imagen", function (req, res) {
        

    })

    app.get("/images/filtro/", function (req, res)  {
        var filtro = "";
        
        console.log("uwu");
        let criterio = {'descripcion': {$regex: ".*"+filtro+".*"}}
        let criterio2 = ({ $query: {} , $orderby: { 'numerolikes' : -1 }  } )    
        console.log(criterio2);
        gestorBD.obtenerItem(criterio2, 'imagenes', function (imagenes){
            console.log(imagenes);
            var imagenesSort = imagenes.sort((a, b) => (a.numeroLikes > b.numeroLikes) ? -1 : 1)
            console.log(imagenesSort);
            if (imagenes == null) {
                res.send({ Error: { status: 500, data: "Se ha producido un error al obtener la lista de imagenes, intentelo de nuevo más tarde" } })
            } else {
                
                res.send({status: 200, data: {imagenes: imagenesSort}});
            }
        });
    });
    
    app.get("/images/filtro/:filtro", function (req, res)  {
        var filtro = "";
        
        let criterio = {'descripcion': {$regex: ".*"+req.params.filtro+".*"}} 
        console.log(criterio);
        gestorBD.obtenerItem(criterio, 'imagenes', function (imagenes){
            console.log(imagenes);
            if (imagenes == null) {
                res.send({ Error: { status: 500, data: "Se ha producido un error al obtener la lista de imagenes, intentelo de nuevo más tarde" } })
            } else {
                
                res.send({status: 200, data: {imagenes: imagenes}});
            }
        });
    });

    app.get("/", function (req, res) {
        gestorBD.obtenerItem({}, 'imagenes', function (imagenes) {
            if (imagenes == null) {
                res.send({ Error: { status: 500, data: "Se ha producido un error al obtener la lista de imagenes, intentelo de nuevo más tarde" } })
            } else {
                res.send({status: 200, data: {imagenes: imagenes}});
            }
        });
    });

    app.post('/images/add', function (req, res) {
        //TODO hacer validador y encriptar la contraseña
        console.log(req.body);
        gestorBD.insertarItem(req.body, 'imagenes', function (imagen) {
            if (imagen == null) {
                res.send({ Error: { status: 500, data: "Se ha producido un error al insertar el imagen, intentelo de nuevo más tarde" } })
            }
            else {
                res.send({status: 200, data: {msg: 'imagen añadido correctamente'}})
            }
        });
    });

    app.delete('/images/delete', function (req, res) {
        let criterio = {"_id": gestorBD.mongo.ObjectID(req.body.id)};
        gestorBD.eliminarItem(criterio, 'imagenes', function(result){
            if (result==null){
                res.send({ Error: { status: 500, data: "Se ha producido un error al borrar el imagen, intentelo de nuevo más tarde" } })
            }
            else {
                res.send({status: 200, data: {msg: 'imagen eliminado correctamente'}})
            }
        })
    });

    app.get('/images/edit/:id', function (req, res) {
        
        let criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)};
        gestorBD.obtenerItem(criterio, 'imagenes', function(imagen){
            if(imagen==null){
                res.send({ Error: { status: 500, data: "Se ha producido un error inesperado, intentelo de nuevo más tarde" } })
            }
            else {
                res.send({status: 200, data: {imagen: imagen}})            }
        });        
    })
    
    app.put('/images/edit/:id', function (req, res) {
        let criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)};
        let nuevoimagen = req.body;
        gestorBD.modificarItem(criterio, nuevoimagen, 'imagenes', function(result){
            if (result==null)
                res.send({ Error: { status: 500, data: "Se ha producido un error al editar el imagen, intentelo de nuevo más tarde" } })
            else {
                res.send({status: 200, data: {msg: 'imagen editado correctamente'}})
            }
        })
    });
}