module.exports = function (app, gestorBD) {

    // app.get("/images/filtro/", function (req, res)  {
    //     var filtro = "";
        
    //     let criterio = {'descripcion': {$regex: ".*"+filtro+".*"}}
    //     let criterio2 = ({ $query: {} , $orderby: { 'numerolikes' : -1 }  } )    
    //     console.log(criterio2);
    //     gestorBD.obtenerItem(criterio2, 'pujas', function (pujas){
    //         console.log(pujas);
    //         var pujasSort = pujas.sort((a, b) => (a.numeroLikes > b.numeroLikes) ? -1 : 1)
    //         console.log(pujasSort);
    //         if (pujas == null) {
    //             res.send({ Error: { status: 500, data: "Se ha producido un error al obtener la lista de pujas, intentelo de nuevo más tarde" } })
    //         } else {
                
    //             res.send({status: 200, data: {pujas: pujasSort}});
    //         }
    //     });
    // });
    
    // app.get("/images/filtro/:filtro", function (req, res)  {
    //     var filtro = "";
        
    //     let criterio = {'descripcion': {$regex: ".*"+req.params.filtro+".*"}} 
    //     console.log(criterio);
    //     gestorBD.obtenerItem(criterio, 'pujas', function (pujas){
    //         console.log(pujas);
    //         if (pujas == null) {
    //             res.send({ Error: { status: 500, data: "Se ha producido un error al obtener la lista de pujas, intentelo de nuevo más tarde" } })
    //         } else {
                
    //             res.send({status: 200, data: {pujas: pujas}});
    //         }
    //     });
    // });
    app.get("/pujas", function (req, res) {
        gestorBD.obtenerItem({}, 'pujas', function (pujas) {
            if (pujas == null) {
                res.send({ Error: { status: 500, data: "Se ha producido un error al obtener la lista de pujas, intentelo de nuevo más tarde" } })
            } else {
                res.send({status: 200, data: {pujas: pujas}});
            }
        });
    });

    app.post('/pujas/add', function (req, res) {
        //TODO hacer validador y encriptar la contraseña
        console.log(req.body);
        var cuerpo = req.body;
        cuerpo.stamp = new Date();
        gestorBD.insertarItem(req.body, 'pujas', function (puja) {
            if (puja == null) {
                res.send({ Error: { status: 500, data: "Se ha producido un error al insertar el puja, intentelo de nuevo más tarde" } })
            }
            else {
                res.send({status: 200, data: {msg: 'puja añadido correctamente'}})
            }
        });
    });

    app.get('/pujas/edit/:id', function (req, res) {
        
        let criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)};
        gestorBD.obtenerItem(criterio, 'pujas', function(puja){
            if(puja==null){
                res.send({ Error: { status: 500, data: "Se ha producido un error inesperado, intentelo de nuevo más tarde" } })
            }
            else {
                res.send({status: 200, data: {puja: puja}})            }
        });        
    })
    
}