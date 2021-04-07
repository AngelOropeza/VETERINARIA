const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const enrutador = require('./enrutador');

module.exports = (req, res) =>{
    // 1. Obtener url desde el objeto
    const urlActual = req.url;
    const urlParseada = url.parse(urlActual, true);

    // 2. Obtener la ruta
    const ruta = urlParseada.pathname;

    // 3. Quitar slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g,'');

    // 3.1 Obtener el método http
    const metodo = req.method.toLowerCase();

    // 3.1.1 Dar permisos de CORS escribiendo los headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, PUT, DELETE, POST"
    );

    // 3.1.2 Dar respuesta inmediata cuando el método sea OPTIONS
    if(metodo === 'options'){
        res.writeHead(204);
        res.end();
        return;
    }

    // 3.2 Obtener variables del query url
    const { query = {} } = urlParseada;

    // 3.3 Obtener los headers
    const { headers = {} } = req;

    // 3.4 Obtener los payloads
    const decoder = new StringDecoder('utf-8'); //Obtiene fuente de informacion por pedazos
    let buffer = '';
    // 3.4.1 ir acumulando la data cuando el request recibe un payload
    req.on('data', (data)=>{
        buffer+= decoder.write(data);
    });
    //3.4.2 terminar de acumular datos y decirle al decoder que finalice 
    req.on('end', ()=>{
        buffer+= decoder.end();
        
        if(headers["content-type"] === "application/json"){
            buffer = JSON.parse(buffer);
        }
        
        //3.4.3 Revisar is tiene subrutas; en este caso el indice del array
        if(rutaLimpia.indexOf("/")>-1){
            //separar las rutas
            var [rutaPrincipal, indice] = rutaLimpia.split('/');
        }

        //3.5 ordenar la data
        // Datos de un request completo => data
        const data = {
            indice,
            ruta: rutaPrincipal || rutaLimpia,
            query,
            metodo,
            headers,
            payload:buffer
        };


        console.log({ data });

        // 3.6 Elegir el manejador dependiendo de la ruta y asignarle funcion que el enrutador tiene
        let handler;
        if(data.ruta && enrutador[data.ruta] && enrutador[data.ruta][metodo]){
            handler = enrutador[data.ruta][metodo];
        } else{
            handler = enrutador.noEncontrado;
        }

        // 4. Ejecutar handler {manejador} para enviar la respuesta
        if(typeof handler === 'function'){
            handler(data, (statusCode = 200, mensaje)=>{
                const respuesta = JSON.stringify(mensaje);
                res.setHeader("Content-Type", "application/json");
                res.writeHead(statusCode);
                // Linea donde realmente ya estamos respondiendo a la aplicacion cliente
                res.end(respuesta);
            })
        }
    });
};