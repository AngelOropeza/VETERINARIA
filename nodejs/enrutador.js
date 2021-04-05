module.exports = {
    ruta: (data, callback)=>{ //handler
        callback(200,{mensaje: 'esta es ruta'});
    },
    mascotas: {
        get: (data, callback)=>{
            if(typeof data.indice !== 'undefined'){
                console.log('handler mascotas',{data})
                if(global.recursos.mascotas[data.indice]){
                    return callback(200, global.recursos.mascotas[data.indice]);
                }
                return callback(404, {
                    mensaje: `mascota con indice ${data.indice} no encontrado`
                });
            }
            callback(200, global.recursos.mascotas);
        },
        post: (data, callback)=>{
            global.recursos.mascotas.push(data.payload);
            callback(201, data.payload); //StatusCode 201 => CREATED
        },
        put: (data, callback)=>{
            if(typeof data.indice !== 'undefined'){
                console.log('handler mascotas',{data})
                if(global.recursos.mascotas[data.indice]){
                    global.recursos.mascotas[data.indice] = data.payload;
                    return callback(200, global.recursos.mascotas[data.indice]);
                }
                return callback(404, {
                    mensaje: `mascota con indice ${data.indice} no encontrado`
                });
            }
            callback(400,{mensaje: 'indice no enviado'});
        },
        delete: (data, callback)=>{
            if(typeof data.indice !== 'undefined'){
                console.log('handler mascotas',{data})
                if(global.recursos.mascotas[data.indice]){
                    global.recursos.mascotas = global.recursos.mascotas.filter((
                        _mascota, indice) => indice != data.indice);
                    return callback(204, {mensaje: `elemento con indice ${data.indice} eliminado`});
                }
                return callback(404, {
                    mensaje: `mascota con indice ${data.indice} no encontrado`
                });
            }
            callback(400,{mensaje: 'indice no enviado'});
        }
    },
    noEncontrado: (data, callback)=>{
        callback(404,{mensaje: 'no encontrado'});
    }
}