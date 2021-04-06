const http = require('http');
const requestHandler = require('./request-handler');

//INICIALIZAMOS SERVIDOR Y RECIBE UN CALLBACK
const server = http.createServer(requestHandler);

server.listen(5000,()=>{
    console.log('El servidor esta escuchando peticiones en http://localhost:5000/');
});