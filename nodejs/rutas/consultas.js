module.exports = function consultas(consultas){
    return {
        get: (data, callback)=>{
            if(typeof data.indice !== 'undefined'){
                console.log('handler consultas',{data})
                if(consultas[data.indice]){
                    return callback(200, consultas[data.indice]);
                }
                return callback(404, {
                    mensaje: `consulta con indice ${data.indice} no encontrado`
                });
            }
            callback(200, consultas);
        },
        post: (data, callback)=>{
            let consulta = data.payload;
            consulta.fechaCreacion = new Date();
            consulta.fechaEdicion = null
            consultas.push(data.payload);
            callback(201, data.payload); //StatusCode 201 => CREATED
        },
        put: (data, callback)=>{
            if(typeof data.indice !== 'undefined'){
                console.log('handler consultas',{data})
                if(consultas[data.indice]){
                    consultas[data.indice] = data.payload;
                    return callback(200, consultas[data.indice]);
                }
                return callback(404, {
                    mensaje: `consulta con indice ${data.indice} no encontrado`
                });
            }
            callback(400,{mensaje: 'indice no enviado'});
        },
        delete: (data, callback)=>{
            if(typeof data.indice !== 'undefined'){
                console.log('handler consultas',{data})
                if(consultas[data.indice]){
                    consultas = consultas.filter((
                        _consulta, indice) => indice != data.indice);
                    return callback(204, {mensaje: `elemento con indice ${data.indice} eliminado`});
                }
                return callback(404, {
                    mensaje: `consulta con indice ${data.indice} no encontrado`
                });
            }
            callback(400,{mensaje: 'indice no enviado'});
        }
    }
}

