module.exports = function (app, gestorBD) {

    app.get("/articulos/filtro/", function (req, res)  {
        var filtro = "";
        
        let criterio = {'descripcion': {$regex: ".*"+filtro+".*"}}
        let criterio2 = ({ $query: {} , $orderby: { '_id' : -1 }  } )    
        console.log(criterio2);
        gestorBD.obtenerItem(criterio2, 'articulos', function (articulos){
            console.log(articulos);
            var articulosSort = articulos.sort((a, b) => (a._id > b._id) ? -1 : 1)
            console.log(articulosSort);
            if (articulos == null) {
                res.send({ Error: { status: 500, data: "Se ha producido un error al obtener la lista de articulos, intentelo de nuevo más tarde" } })
            } else {
                
                res.send({status: 200, data: {articulos: articulosSort}});
            }
        });
    });
    
    app.get("/articulos/filtro/:filtro", function (req, res)  {
        var filtro = "";
        
        let criterio = {'descripcion': {$regex: ".*"+req.params.filtro+".*"}} 
        console.log(criterio);
        gestorBD.obtenerItem(criterio, 'articulos', function (articulos){
            console.log(articulos);
            if (articulos == null) {
                res.send({ Error: { status: 500, data: "Se ha producido un error al obtener la lista de articulos, intentelo de nuevo más tarde" } })
            } else {
                
                res.send({status: 200, data: {articulos: articulos}});
            }
        });
    });

    app.get("/articulos", function (req, res) {
        gestorBD.obtenerItem({}, 'articulos', function (articulos) {
            if (articulos == null) {
                res.send({ Error: { status: 500, data: "Se ha producido un error al obtener la lista de articulos, intentelo de nuevo más tarde" } })
            } else {
                res.send({status: 200, data: {articulos: articulos}});
            }
        });
    });

    app.post('/articulos/add', function (req, res) {
        //TODO hacer validador y encriptar la contraseña
        console.log(req.body);
        gestorBD.insertarItem(req.body, 'articulos', function (articulo) {
            if (articulo == null) {
                res.send({ Error: { status: 500, data: "Se ha producido un error al insertar el articulo, intentelo de nuevo más tarde" } })
            }
            else {
                res.send({status: 200, data: {msg: 'articulo añadido correctamente'}})
            }
        });
    });

    app.get('/articulos/edit/:id', function (req, res) {
        
        let criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)};
        gestorBD.obtenerItem(criterio, 'articulos', function(articulo){
            if(articulo==null){
                res.send({ Error: { status: 500, data: "Se ha producido un error inesperado, intentelo de nuevo más tarde" } })
            }
            else {
                res.send({status: 200, data: {articulo: articulo}})            }
        });        
    })
    
}