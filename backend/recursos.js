module.exports = {
    mascotas: [
        {tipo: "Perro", nombre: "Trosky0", dueno: "Camilo"},
        {tipo: "Perro", nombre: "Trosky1", dueno: "Camilo"},
        {tipo: "Perro", nombre: "Trosky2", dueno: "Camilo"},
        {tipo: "Perro", nombre: "Trosky3", dueno: "Camilo"},
        {tipo: "Perro", nombre: "Trosky4", dueno: "Camilo"}
    ],
    veterinarias: [
        {nombre: "Alexandra", apellido: "Perez", documento: "1234567890"},
        {nombre: "Eduardo", apellido: "Gomez", documento: "1234567000"},
        {nombre: "Luisa", apellido: "Madrid", documento: "1234566666"},
        {nombre: "Naarye", apellido: "Vazquez", documento: "100066666"},
    ],
    duenos: [
        {nombre: "Alejandra", apellido: "Ramirez", documento: "0000000000"},
        {nombre: "Julio", apellido: "Tamayo", documento: "1111111111"},
        {nombre: "Natalia", apellido: "Rodrigez", documento: "2222222222"},
        {nombre: "Roman", apellido: "Vazquez", documento: "3333333333"},
    ],
    consultas: [
        {
            mascota: 0,
            veterinaria: 0,
            fechaCreacion: new Date(),
            fechaEdicion: new Date(),
            historia: '', 
            diagnostico: ''
        }
    ]
}